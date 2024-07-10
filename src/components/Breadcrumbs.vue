<template>
  <div class="container">
    <ul class="breadcrumb">
      <li v-for="(crumb, index) in breadcrumbs" :key="index" :class="{'breadcrumb__item': true, 'breadcrumb__item-firstChild': index === 0, 'breadcrumb__item-lastChild': index === breadcrumbs.length - 1}">
        <span class="breadcrumb__inner">
          <router-link :to="crumb.path" class="breadcrumb__title">{{ crumb.name }}</router-link>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      const breadcrumbs = JSON.parse(localStorage.getItem('breadcrumbs')) || [];
      console.log(breadcrumbs)
      console.log(this.$route)
      console.log(this)


      return breadcrumbs;

    },
    sectionName() {
      const index = this.$route.params.index;
      return this.menuItems[index] ? this.menuItems[index].name : 'Неизвестный раздел';
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Oswald:300,400,500|PT+Sans+Narrow:400,700|Play:400,700|Ubuntu+Condensed&display=swap&subset=cyrillic');


ul, li {
  list-style: none;
}

.container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-width: 480px;
  padding: 0 40px;
  align-items: center;
  justify-content: left;
}

.breadcrumb {
  display: flex;
  border-radius: 10px;
  margin: auto;
  text-align: center;
  top: 50%;
  width: 100%;
  height: 40px;
  transform: translateY(-50%);
  z-index: 1;
  justify-content: center;
}


.breadcrumb__item {
  height: 100%;
  background-color: white;
  color: #252525;
  font-family: 'Oswald', sans-serif;
  border-radius: 7px;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  transform: skew(-21deg);
  box-shadow: 0 2px 5px rgba(0,0,0,0.26);
  margin: 5px;
  padding: 0 40px;
  cursor: pointer;
}


.breadcrumb__item:hover {
  background: #b898dc;
  color: #FFF;
}


.breadcrumb__inner {
  display: flex;
  flex-direction: column;
  margin: auto;
  z-index: 2;
  transform: skew(21deg);
}

.breadcrumb__title {
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-decoration: none;
  color: #252525;
}




@media all and (max-width: 1000px) {
  .breadcrumb {
    height: 35px;
  }

  .breadcrumb__title{
    font-size: 11px;
  }
  .breadcrumb__item {
    padding: 0 30px;
  }
}

@media all and (max-width: 710px) {
  .breadcrumb {
    height: 30px;
  }
  .breadcrumb__item {
    padding: 0 20px;
  }

}
</style>