<script setup>
import { ref } from 'vue';
import { db, auth } from '@/js/firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import router from '@/router/index.js';

const username = ref(null)
const email = ref(null)
const password = ref(null)

function submitForm() {
  console.log( `Username: ${username.value}, Email: ${email.value}, Password: ${password.value}` )

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user
      updateProfile(user, {
        displayName: username.value,
      })
      const userRef = doc(db, 'users', user.uid);
      setDoc(userRef, {
        username: username.value,
        email: email.value,
        // password: password.value,
      });
      router.push('/')
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log('Error Code: ' + errorCode)
      console.log('Error Message: ' + errorMessage)
    })
}
</script>

<template>
  <div class="register">
    <div class="register__text">REGISTER</div>
    <form @submit.prevent="submitForm">
      
      <div class="register__field">
        <input v-model="username" id="name" type="text" placeholder="Username" />
      </div>

      <div class="register__field">
        <div class="icon__box">
          <img class="icon" src="/icon-email.svg" alt="email" />
        </div>
        <input v-model="email" id="email" type="text" placeholder="Email" />
      </div>

      <div class="register__field">
        <div class="icon__box">
          <img class="icon" src="/icon-password.svg" alt="password" />
        </div>
        <input v-model="password" id="password" type="password" placeholder="Password" />
      </div>

      <button type="submit">Register</button>

    </form>
  </div>
</template>

<style lang="scss" scoped>
.register {
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
.register__text {
  font-size: 40px;
  color: #7dacf9;
  font-weight: 600;
  letter-spacing: 2px;
}
form {
  .register__field {
    margin-top: 20px;
    display: flex;
    width: 320px;
    .icon__box {
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
