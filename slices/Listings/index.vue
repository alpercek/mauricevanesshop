<template>
  <section class="section">
   list
  </section>
</template>

<script>
export default {
  name: "Listings",
  props: {
    slice: {
      type: Object,
      required: true,
      default() {
        return {}
      },
    },
  },
}
</script>