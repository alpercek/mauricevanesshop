<template>
  <section class="section">
    {{ page }}
  </section>
</template>

<script>
export default {
  async asyncData ({ $prismic, store }) {
    const page = await $prismic.api.query('')
    await store.dispatch('prismic/load')
    return {
      page
    }
  },
  name: "Highlight",
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