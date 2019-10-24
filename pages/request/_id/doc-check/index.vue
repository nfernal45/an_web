<template lang="pug">
  div
    // Направление документов на проверку в ЖН по АО
    doc-check-direction

    // Распоряжение на проведение проверки
    doc-check-order

    // Заключение по итогам проверки заявления и документов
    doc-check-conclusion
</template>
<script>
import docCheckDirection from '@/components/appeal/docCheck/docCheckDirection'
import docCheckConclusion from '@/components/appeal/docCheck/docCheckConclusion'
import docCheckOrder from '@/components/appeal/docCheck/docCheckOrder'

export default {
  name: 'AppealDocCheckPage',
  components: {
    docCheckDirection,
    docCheckConclusion,
    docCheckOrder
  }
}
</script>
<style lang="sass"></style>
