<template>
  <section class="section">
    <table class="md:ml-[43vw] font-cooperbt text-left tracking-[-0.01em] text-xs mt-28 md:mt-0 ml-7">
      <tbody>
      <tr>
        <th class="w-[8.6rem]">Year:</th>
        <th><prismic-rich-text :field="slice.primary.year" /></th>
      </tr>
      <tr>
        <th>Pages:</th>
        <th><prismic-rich-text :field="slice.primary.pages" /></th>
      </tr>
      <tr>
        <th>Dimensions:</th>
        <th><prismic-rich-text :field="slice.primary.dimensions" /></th>
      </tr>
      <tr>
        <th>Paper:</th>
        <th><prismic-rich-text :field="slice.primary.paper" /></th>
      </tr>
      <tr>
        <th>Copyright:</th>
        <th><prismic-rich-text :field="slice.primary.copyright" /></th>
      </tr>
      <tr>
        <th>ISBN:</th>
        <th><prismic-rich-text :field="slice.primary.isbn" /></th>
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