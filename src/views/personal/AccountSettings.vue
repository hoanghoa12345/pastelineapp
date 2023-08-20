<template>
  <h1 class="text-4xl py-4">Account settings</h1>
  <div class="lg:max-w-2xl lg:mx-auto">
    <h3 class="font-semibold py-4">Change password</h3>

    <form @submit="onSubmit">
      <TextInput
        type="password"
        label="Current password"
        placeholder="••••••••"
        v-bind="currentPassword"
        :errors="errors.currentPassword"
      />
      <TextInput
        class="my-4"
        type="password"
        label="New password"
        placeholder="••••••••"
        v-bind="newPassword"
        :errors="errors.newPassword"
      />
      <TextInput
        class="my-4"
        type="password"
        label="Confirm new password"
        placeholder="••••••••"
        v-bind="confirmPassword"
        :errors="errors.confirmPassword"
      />
      <Button type="submit" :isLoading="isLoading" @click="onSubmit">
        Update password
      </Button>
    </form>
  </div>
</template>
<script setup lang="ts">
const {
  isLoading,
  currentPassword,
  newPassword,
  confirmPassword,
  errors,
  onSubmit,
} = useAccountSettings();
</script>
