<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import Input from "../components/Input.vue";

const { register } = useAuthStore();
const name = ref("");
const email = ref("");
const password = ref("");

const error = ref("");

const registerUser = async () => {
  try {
    await register(name.value, email.value, password.value);
  } catch (err) {
    error.value = err.message;
  }
};
</script>
<template>
  <section>
    <div class="flex flex-col items-center justify-center mx-auto sm:my-10">
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Sign Up to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="registerUser">
            <Input
              v-model="name"
              type="text"
              label="Name"
              placeholder="Name "
              id="name"
            />
            <Input
              v-model="email"
              type="text"
              label="Email"
              placeholder="Email "
              id="email"
            />
            <Input
              v-model="password"
              type="password"
              label="Password"
              placeholder="Password"
              id="password"
            />

            <button
              type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Register
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Do have an account yet?
              <router-link
                to="/login"
                class="font-medium text-primary-600 hover:underline"
                >Log in</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
