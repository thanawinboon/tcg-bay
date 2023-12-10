<script setup>
import { ref, onMounted } from 'vue'
import { auth } from '@/js/firebase'
import { collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore'
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytesResumable
} from 'firebase/storage'
import { db } from '@/js/firebase.js'
import router from '@/router/index.js'

const name = ref('')
const category = ref('')
const note = ref('')
const uploadedImage = ref(null)

// probably monitors the file upload
async function handleFileUpload(event) {
  const file = event.target.files[0]
  uploadedImage.value = file
}

// triggers when the upload button is clicked
async function uploadCard() {
  if (!uploadedImage.value) return // rejects if no image

  try {
    // uploads image to firebase storage
    const storage = getStorage()
    const imageStore = storageRef(storage, `images/${uploadedImage.value.name}`)

    const snapshot = await uploadBytesResumable(imageStore, uploadedImage.value)
    console.log('File uploaded successfully:', snapshot)

    // get image url
    const imageUrl = await getDownloadURL(snapshot.ref)
    console.log('File available at:', imageUrl)

    // get user id and get user's cards collection
    const user = auth.currentUser
    const userCardsCollectionRef = collection(db, 'cards')

    const docRef = await addDoc(userCardsCollectionRef, {
      name: name.value,
      category: category.value.name,
      note: note.value,
      time: serverTimestamp(),
      owner: {
        id: user.uid,
        name: user.displayName,
        email: user.email
      },
      imageUrl: imageUrl
    })
    console.log('Document written with ID: ', docRef.id)
    router.push('/')
  } catch (error) {
    console.error('Error uploading file:', error)
  }
}

const categories = ref([])
function getCategories() {
  onSnapshot(collection(db, 'categories'), (querySnapshot) => {
    try {
      let categorySnapshot = []
      querySnapshot.forEach((doc) => {
        let category = {
          name: doc.data().name
        }
        categorySnapshot.push(category)
      })
      categories.value = categorySnapshot
    } catch (error) {
      console.error('Error fetching cards:', error)
    }
  })
}

onMounted(() => {
  getCategories()
})
</script>

<template>
  <div class="upload">
    <div class="upload__text">UPLOAD</div>

    <form @submit.prevent="uploadCard">
      <div class="upload__field">
        <input v-model="name" id="name" type="text" placeholder="Card name..." />
      </div>

      <div class="upload__field">
        <label for="category">Select a category:</label>
        <select id="category" v-model="category">
          <option disabled value="">Please select one</option>
          <option v-for="(category, index) in categories" :key="index" :value="category">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="upload__field">
        <input
          v-model="note"
          id="note"
          type="text"
          placeholder="Additional Notes about the card (e.g. Mint condition, 1990 edition, etc.)"
        />
      </div>

      <div class="upload__field">
        <input type="file" @change="handleFileUpload" />
      </div>

      <button type="submit">Upload</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.upload {
  --shadow-color: rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 370px;
  color: #94a5bc;
  background-color: #0d2037;
  border-radius: 1rem;
  box-shadow: 0px 0px 20px 20px rgba(0, 0, 0, 0.418);
  padding: 1.5rem;
}
.upload__text {
  font-size: 40px;
  color: #7dacf9;
  font-weight: 600;
  letter-spacing: 2px;
}
form {
  .upload__field {
    margin-top: 20px;
    display: flex;
    width: 320px;
    .upload__box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      width: 60px;
      color: #94a5bc;
      border: 1px solid #485c73;
      border-radius: 5px 0 0 5px;
      border-right: none;
      background: #021524;
      .icon {
        max-width: 30px;
        max-height: 30px;
      }
    }

    label {
      margin: 0 10px;
    }
  }
}
input,
form button {
  height: 50px;
  width: 100%;
  outline: none;
  font-size: 19px;
  color: #99a8c2;
  padding: 0 15px;
  border-radius: 0 5px 5px 0;
  border: 1px solid #485c73;
  caret-color: white;
  background: #051726;
}
form button {
  border-radius: 5px;
}
input:focus {
  color: #7dacf9;
  background: #0f2137;
  border: 1px solid #7dacf9;
}
button {
  margin-top: 20px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
}
button:hover {
  color: #d3e2fc;
  border: 1px solid #7dacf9;
  background: #0f2137;
}
</style>
