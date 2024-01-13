<template>
  <section class="section">
    <table class="md:ml-[43vw] font-cooperbt text-left tracking-[-0.01em] text-sm mt-28 md:mt-0 ml-7 md:ml-0">
      <tbody>
      <tr>
        <th class="w-[8.6rem]">Authors:</th>
        <th><prismic-rich-text :field="slice.primary.authors" /></th>
      </tr>
      <tr>
        <th>Year:</th>
        <th><prismic-rich-text :field="slice.primary.year" /></th>
      </tr>
      <tr>
        <th>ISBN:</th>
        <th><prismic-rich-text :field="slice.primary.isbn" /></th>
      </tr>
      <tr>
        <th>Language:</th>
        <th><prismic-rich-text :field="slice.primary.language" /></th>
      </tr>
    </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: "BookInfo",
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