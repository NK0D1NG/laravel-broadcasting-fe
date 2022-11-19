<template>
    <div class="gap-8">
        <div class="bg-base-200 p-8 rounded-xl">
            <form @submit.prevent="login()" class="form-control">
                <label class="label" for="fname">Email</label>
                <input v-model="form.email" type="text" id="email" name="email" placeholder='aclient@local.de'
                    required class="input placeholder-white placeholder-opacity-25"><br><br>
                <label class="label" for="password">Password</label>
                <input v-model="form.password" type="password" id="password" name="password" placeholder="password"
                    required class="input placeholder-white placeholder-opacity-25"><br><br>
                <!-- <p class="bg-orange-700 mb-10 p-2 rounded-md text-white" v-if="store.error">{{ store.message }}</p> -->
                <button class="mt-8 btn btn-accent cursor-pointer" type="submit">log-in</button>
            </form>
        </div>
    </div>
</template>


<script setup>
import { useAuthStore } from '@/composables/auth/store';
import { useLogin } from '@/composables/auth/api';

const store = useAuthStore()

const form = {
    email: '',
    password: ''
}

async function login() {
    const res = await useLogin(form.email, form.password)
    if (store.authenticated) {
        // start listening to events
    }
}
</script>
