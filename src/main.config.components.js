import CommonsHeader from '@/components/common/global/CommonsHeader.vue'
import CommonsNavigation from '@/components/common/global/CommonsNavigation.vue'
import PresentationImage from '@/components/common/global/PresentationImage.vue'
import Break from '@/components/utils/Break.vue'
import Carousel from '@/components/utils/Carousel.vue'
import Flex from '@/components/utils/Flex.vue'
import FormInput from '@/components/utils/FormInput.vue'
import Grid from '@/components/utils/Grid.vue'
import Icon from '@/components/utils/Icon.vue'
import IconList from '@/components/utils/IconList.vue'
import Modal from '@/components/utils/Modal.vue'
import Vue from 'vue'

const utils = [Break, Carousel, Flex, FormInput, Grid, Icon, IconList, Modal]
const global = [PresentationImage, CommonsHeader, CommonsNavigation]
const components = [...utils, ...global]

export const configureComponents = () => {
  components.forEach(comp => {
    Vue.component(comp.name, comp)
  })
}
