<template>
  <div class="layout-vertical">
    <commons-header @help="$refs.modal.show()" @restart="() => {}" />
    <tippy to="trigger" :interactive="true" arrow>
      <flex :column="true" class="tippy-inner">
        <p>Exit Tribute: the percentage of funds that feeds back into the Funding Pool when members choose to sell their RxC tokens.</p>
        <div style="text-align:center;">
          <button class="x-text-button mh-0p5 inline" @click="$refs.modal.show()">More info</button>
        </div>
      </flex>
    </tippy>
    <h2 class="teko-subtitle text-center">What percentage goes to funding at <span name="trigger" class="underline-pointer">exit</span>?</h2>
    <div class="layout-form">
      <commons-navigation />
      <grid class="layout-form-grid">
        <grid class="layout-form-icons">
          <grid class="justify-self-start justify-items align-content relative" gap="1">
            <p class="font-teko fs-24">Your Wallet</p>
            <Cylinder :progress="100 - exitingProgress" type="blue" />
            <exit-form-circles
              v-if="isDesktop"
              :progress="100 - exitingProgress"
              style="right: -90px;"
            />
          </grid>
          <icon icon="Man" v-if="$breakpoints.xl" />
          <grid class="justify-self-end justify-items align-content relative" gap="1">
            <p class="font-teko fs-24">Funding Pool</p>
            <Cylinder :progress="exitingProgress" type="green" />
            <exit-form-circles
              v-if="isDesktop"
              :progress="exitingProgress"
              :style="$breakpoints.xl ? 'left: -90px;' : 'right: -90px;'"
            />
          </grid>
        </grid>
        <form-input
          type="range"
          v-model="forms.input.exiting"
          @valid="forms.vset.input.exiting"
          required
          :min="minmax.exiting.min"
          :max="minmax.exiting.max"
        />
        <grid gtc="auto 1fr auto">
          <p class="form-text">{{ minmax.exiting.min }}%</p>
          <p class="form-text-value justify-self">{{ forms.input.exiting }}%</p>
          <p class="form-text">{{ minmax.exiting.max }}%</p>
        </grid>
      </grid>
    </div>

    <button commons @click="$router.push('/level/7/1')" :disabled="!forms.vget.input.form">
      next
    </button>

    <modal ref="modal" :bg="false" overlay="dark">
      <div class="layout-modal">
        <h2 class="teko-title">Exit Tribute</h2>
        <p class="level-text mt-1">
          Members choose to pass good proposals that produce valuable outcomes for the community. 
          They contribute time and resources in exchange for their governance tokens. They continue 
          to grow the Commons and raise the price of the token.
        </p>
        <p class="level-text">
          Some members may not like the results of the proposals passed by the RadicalxChange 
          Commons, or may need to sell some of their tokens to cover their expenses. When they sell 
          their RxC token, the overall price of the token decreases as value is being withdrawn 
          from the community. At the same time, a portion of the withdrawal (5%, for example) feeds 
          into the community funding pool, as an ‘exit tribute’ to the RadicalxChange community. 
          This protects the Commons from profit-extracting behavior, and ensures continuous 
          funding for the community pool of funds that can be put towards proposals.
        </p>
        <p class="level-text">
          You must decide what percentage of funding released from the RxC Reserve goes to the 
          Funding Pool (“Funding Pool”) when an exiting member sells their tokens, and how much of 
          the value remains for the contributor to receive (“Your Wallet”).
        </p>
        <button commons class="mt-2" @click="$refs.modal.hide()">OK</button>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cylinder from '../../components/common/Cylinder.vue'
import ExitFormCircles from '../../components/common/ExitFormCircles.vue'
import { utils } from '../../utils/utils'

export default {
  name: 'level-6-1',
  components: {
    Cylinder,
    ExitFormCircles,
  },
  data() {
    return {
      forms: {
        input: {
          exiting: this.$store.state.CommonsModule.form.exiting,
        },
      },
    }
  },
  computed: {
    ...mapState('CommonsModule', ['minmax']),
    isDesktop() {
      return (window.innerWidth > 750)
    },
    exitingProgress() {
      return utils.changeScale(
        this.forms.input.exiting,
        this.minmax.exiting.min,
        this.minmax.exiting.max,
      )
    },
  },
  watch: {
    'forms.input.exiting'(x) {
      this.$store.commit('CommonsModule/setFormExiting', x)
    },
  },
}
</script>

<style scoped lang="scss">
.layout-form-icons {
  height: 300px;
  gap: 5rem;
  @include xl {
    grid-template-columns: 1fr auto 1fr;
    gap: 2rem;
  }
}
</style>
