<template>
  <div>
    <Breadcrumbs />
    <h1 class="title">Раздел {{ sectionName }}</h1>

    <div v-if="!subsections || subsections.length === 0">Нет доступных подразделов.</div>
    <router-view></router-view>

    <div v-if="sectionContent">
      <p>{{ sectionContent }}</p>
    </div>

    <ul>
      <li v-for="(subsection, subIndex) in subsections" :key="subIndex">
        <router-link :to="`/section/${$route.params.index}/${subIndex}`">
          <div class="card">
            <img :src="subsection.image" :alt="subsection.name" class="card-image" />
            <div class="card-content">
              <h2>{{ subsection.name }}</h2>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Breadcrumbs from "@/components/Breadcrumbs.vue";

export default {
  components: { Breadcrumbs },
  computed: {
    ...mapState(['menuItems']),
    section() {
      const index = this.$route.params.index;
      return this.menuItems[index] || {};
    },
    sectionName() {
      return this.section.name || 'Неизвестный раздел';
    },
    sectionContent() {
      return this.section.content || '';
    },
    subsections() {
      return this.section.subsections || [];
    }
  }
}
</script>
<style scoped>

.title {
  color: #5C5696;
  font-size: 24px;
  margin: 20px;
  text-align: center;
}
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.card-image {
  width:250px;
  height: 250px;
}

.card-content {
  padding: 15px;
}

.card-content h2 {
  margin-top: 0;
}

.card-content ul {
  list-style-type: none;
  padding: 0;
}

.card-content li {
  margin-bottom: 5px;
}
.title {
  color: #5C5696;
  font-size: 24px;
  margin: 20px;
  text-align: center;
}
.breadcrumbs-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}
img{
  width:250px;
  height: 250px;
}
nav {
  top: 15px;
  left: 50%;
  display: inline-block;
  border: 2px solid #EBECF1;
  align-content: center;
  justify-content: center;
  border-radius: 30px;
  animation: slide-in 1s ease-out;
  margin: 20px;
}

ul {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  margin: 0;
  padding: 0 30px;
  list-style-type: none;
  li:not(:last-child) {
    margin-right: 40px;
  }
  li {
    border: 2px solid transparent;
    border-radius: 5px;
    padding: 10px;
    transition: background 0.2s;
    a {
      color: #2375D8;
      text-decoration: none;
      text-transform: uppercase;
      transition: color 0.2s;
    }
    ul {
      visibility: hidden;
      opacity: 0;
      position: absolute;
      display: block;
      margin: 12px -12px;
      padding: 0;
      background: #8e8bbc;
      border: 2px solid #8e8bbc;

      border-radius: 5px;
      transition: opacity 0.2s, visibility 0.2s;
      li {
        margin: -2px 0 0 -2px;
        width: auto;
        line-height: 1.7;
        a {
          color: #2375D8;
        }
      }
    }
    &:hover {
      background: #776BCC;
      border: 2px solid #776BCC;

      a {
        color: #F9F8FD;
      }
      ul {
        visibility: visible;
        opacity: 1;
        box-shadow: 0px 3px 5px 2px #EBECF1;
        li {
          a {
            color: #F9F8FD;
          }
        }
      }
    }
  }
}

@keyframes slide-in {
  0% {
    top: -50px;
  }
  40% {
    top: 20px;
  }
  70% {
    top: 10px;
  }
  100% {
    top: 15px;
  }
}
</style>