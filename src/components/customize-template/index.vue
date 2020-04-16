<template>
  <div class="section-wrapper clearfix">
    <section v-for="(section,index) of sections"
      :key="index">
      <component :is="section.sectionComponent"
        :data="section"></component>
    </section>
  </div>
</template>

<script>
/* 加载所有templates */
const req = context => context.keys().map(context);
const templates = req(require.context('./templates', false, /\.vue$/));

let Components = {};
templates.forEach(temp => {
  let _instance = temp.default;
  Components[_instance.name] = _instance;
});

export default {
  name: 'CustomizeTemplate',

  components: {
    ...Components
  },

  props: {
    sections: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.section-wrapper {
  overflow: hidden;
}
</style>
