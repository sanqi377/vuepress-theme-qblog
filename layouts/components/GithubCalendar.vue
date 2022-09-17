<template>
  <article style="width: 844px;background: #fff;margin: 0 auto;padding: 15px">
    <svg width="844" height="132">
      <g class="react-activity-calendar__legend-month" style="font-size: 16px;">
        <text v-for="i in 12" :x="getMonthTextOffset(i-1)" alignment-baseline="hanging">{{ i }}月</text>
      </g>
    </svg>
  </article>
</template>

<script>
export default {
  name: "GithubCalendar",
  methods: {
    getMonthTextOffset(i) {
      console.log(i)
      return 70 * i
    }
  }
}
</script>

<style scoped>

</style>