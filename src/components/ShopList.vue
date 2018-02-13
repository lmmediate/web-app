<template>
  <div>
  	<h2 style="margin: 10px; font-weight: lighter">Список покупок</h2>
    <ul>
      <li v-for="item in items">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      items: [] 
    }
  },
  beforeMount: function() {
    this.$http.get('shoplist')
      .then(res => {
        this.items = res.data;
      });
  }
}
</script>
