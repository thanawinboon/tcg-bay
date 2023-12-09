<script setup>
import { ref } from 'vue'
import { auth } from '@/js/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import router from '@/router/index.js'

const email = ref(null)
const password = ref(null)

function login() {
  console.log('Login : ' + email.value + ' : ' + password.value)

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user
      console.log(user)
      console.log(userCredential)
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
  <div class="login">
    <div class="login__text">LOGIN</div>
    <form @submit.prevent="login">
      <div class="login__field">
        <div class="icon__box">
          <img class="icon" src="/icon-email.svg" alt="email" />
        </div>
        <input v-model="email" id="email" type="text" placeholder="Email" />
      </div>
      <div class="login__field">
        <div class="icon__box">
          <img class="icon" src="/icon-password.svg" alt="password" />
        </div>
        <input v-model="password" id="password" type="password" placeholder="Password" />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.login {
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
.login__text {
  font-size: 40px;
  color: #7DACF9;
  font-weight: 600;
  letter-spacing: 2px;
}
form {
  .login__field {
    margin-top: 20px;
    display: flex;
    .icon__box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      width: 60px;
      color: #94a5bc;
      border: 1px solid #485c73;
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
input:focus {
  color: #7DACF9;
  background: #0F2137;
}
button {
  margin-top: 20px;
  border-radius: 5px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
}
button:hover {
  color: #D3E2FC;
  border: 1px solid #7DACF9;
  background: #0F2137;
}
</style>
