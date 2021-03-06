<template>
    <div class="outcome-bg">
    <grid class="outcome-grid layout-vertical h-vh" gtc="1fr">
      <grid class="score-grid align-self justify-items">
        <commons-header title-only />
        <p class="teko-title">{{ display.title }}</p>
        <p class="x-subtitle">{{ display.subtitle }}</p>
        <p class="x-score">{{ score }}<span>/1000</span></p>
        <p class="x-improve">Try to improve your score.</p>
        <button commons @click="$router.push('/')">play again</button>
        <grid
          gap="0.5"
          gtc="repeat(5, auto)"
          align-items
          class="mt-2"
        >
          <p class="x-text">Share your score:</p>
          <ShareNetwork
            network="twitter"
            :url="url"
            :title="text"
          >
            <icon class="ml-1" icon="Twitter" />
          </ShareNetwork>
          <ShareNetwork
            network="facebook"
            :url="url"
            :quote="text"
          >
            <icon class="ml-1" icon="Facebook" />
          </ShareNetwork>
          <ShareNetwork
            network="telegram"
            :url="url"
            :title="text"
          >
            <icon class="ml-1" icon="Telegram" />
          </ShareNetwork>
          <ShareNetwork
            network="linkedin"
            :url="url"
          >
            <icon class="ml-1" icon="LinkedIn" />
          </ShareNetwork>
        </grid>
        <p class="mt-2 x-improve">
          <a
            class="x-text-button"
            target="_blank"
            href="https://github.com/commons-stack/commons-simulator/issues/new"
          >
            Give us feedback
          </a>
        to help improve this game!
        </p>
        <p class="credits m-1 p-1">
          Art of Mark Henson
        </p>
      </grid>
      <div class="x-img-wrap">
      <img :src="display.image" class="x-img" alt="outcome image background" />
    </div>
  </grid>
  </div>
</template>

<script>
export default {
  name: 'outcome',
  created() {
    this.future = this.score < 500 ? 'bad' : 'good'
  },
  data() {
    return {
      future: 'bad',
      url: 'https://sim.commonsstack.org/',
      text: "I'm helping design a regenerative future for humanity on the Commons Simulator! Can you beat my high score?",
    }
  },
  methods: {
    toggleFuture() {
      this.future = this.future === 'bad' ? 'good' : 'bad'
    },
  },
  computed: {
    name() {
      return this.$store.getters['UserModule/getName']
    },
    score() {
      return this.$store.state.CommonsModule.outcome.result?.data.score
    },
    display() {
      return {
        good: {
          title: 'Good future',
          subtitle: this.name
            ? `You made a High Score, ${this.name}!`
            : 'You made a High Score!',
          image: require('@/assets/outcome_good.jpeg'),
        },
        bad: {
          title: 'Bad future',
          subtitle: 'Your score',
          image: require('@/assets/outcome_bad.jpeg'),
        },
      }[this.future]
    },
  },
}
</script>

<style scoped lang="scss">
.outcome-bg {
  background: #000A1A;
  margin: 0 -40px;
  padding: 20px;
  height: 100%;
}
.outcome-grid {
  @include l {
    grid-template-columns: 1fr 1fr !important;
  }
}
.score-grid {
  z-index: 2;
}
.x-img {
  object-fit: cover;
  object-position: center;
}
.x-img-wrap {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1;
  & > img {
    width: 100vw;
    height: 100vh;
      @include l {
      width: 100%;
      height: 100vh;
    }
  }
  @include l {
    width: 50vw;
    height: 50vh;
    top: 0;
    left: 50%;
  }
}
.x-subtitle {
  @extend .teko-subtitle;
  margin-top: 1rem;
  @include s {
    margin-top: 3rem;
  }
}
.x-score {
  @extend .font-teko;
  font-size: 64px;
  span {
    color: #FFF;
    font-size: 36px;
    @include l {
      color: #4D4D4D;
    }
  }
}
.x-improve {
  font-size: 16px;
  margin-bottom: 1rem;
}
.x-text {
  font-size: 16px;
}
.credits {
  @include m {
    position: fixed;
    bottom: 0;
    right: 0;
  }
}
</style>
