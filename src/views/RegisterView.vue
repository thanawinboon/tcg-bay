<script setup>

import {ref} from 'vue'
import { auth } from '@/js/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import router from '@/router/index.js'

const email = ref(null)
const password = ref(null)

function submitForm() {
    console.log("Register : " + email.value + " : " + password.value);

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            console.log(userCredential)
            router.push('/')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error Code: " + errorCode)
            console.log("Error Message: " + errorMessage)
        });

}

function resetForm () {
    console.log("Reset Form");
    email.value = null;
    password.value = null;
}
</script>

<template>
  <div class="register">
    <h1>Register</h1>
        <form @submit.prevent="submitForm">
            <div class="form-item">
                <label>E-mail </label>
                <input v-model="email" id="email" type="text" />
            </div>
            <div class="form-item">
                <label>Password </label>
                <input v-model="password" id="password" type="password" />
            </div>
            <div class="form-item">
                <button @click.prevent="resetForm">Reset </button>
                <button type="submit">Register </button>
            </div>           
        </form>
</div>
</template>

<style scoped>
.register {
  text-align: center;
}
.form-item {
  display: flex;
  justify-content: space-between;
  margin: 20px;
}
</style>
