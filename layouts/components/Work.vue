<template>
  <div id="link">
    <header id="page-header">
      <Nav/>
    </header>
    <main class="layout">
      <div class="work-overview">
        <div class="work-overview-cards">
          <div class="work-card">
            <div class="overview-wrapper">
              <div class="work-left">
                <div class="work-icon">
                  <svg viewBox="0 -13 512 512" xmlns="http://www.w3.org/2000/svg" style="background-color:#2e2882">
                    <g fill="#feb0a5">
                      <path
                          d="M256 92.5l127.7 91.6L512 92 383.7 0 256 91.5 128.3 0 0 92l128.3 92zm0 0M256 275.9l-127.7-91.5L0 276.4l128.3 92L256 277l127.7 91.5 128.3-92-128.3-92zm0 0"></path>
                      <path d="M127.7 394.1l128.4 92 128.3-92-128.3-92zm0 0"></path>
                    </g>
                    <path
                        d="M512 92L383.7 0 256 91.5v1l127.7 91.6zm0 0M512 276.4l-128.3-92L256 275.9v1l127.7 91.5zm0 0M256 486.1l128.4-92-128.3-92zm0 0"
                        fill="#feb0a5"></path>
                  </svg>
                </div>
                <div class="overview-detail">
                  <div class="work-card-title">Vuepress-theme-qblog</div>
                  <div class="work-card-subtitle">阿巴阿巴阿巴</div>
                </div>
              </div>
              <div class="work-start">
                <svg class="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path
                      d="M20.8 4.6a5.5 5.5 0 00-7.7 0l-1.1 1-1-1a5.5 5.5 0 00-7.8 7.8l1 1 7.8 7.8 7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z"></path>
                </svg>
              </div>
            </div>
            <!--            <div class="work-overview-buttons">-->
            <!--              <div class="search-buttons time-button">Full Time</div>-->
            <!--              <div class="search-buttons level-button">Senior Level</div>-->
            <!--              <div class="job-stat">New</div>-->
            <!--              <div class="job-day">4d</div>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Nav from './Nav.vue'

export default {
  components: {Nav},
}
</script>

<style lang="stylus" scoped>
#page-header {
  position: relative;
  width: 100%;
  height: 60px;
  background-image: none !important;
  display: flex;
  justify-content: center;
}

.layout {
  max-width: 1400px;
  padding: 1rem 1.5rem;
  margin: 0 auto;

  .work-overview {
    display: flex;
    flex-grow: 1;
    -webkit-animation: slide 0.6s both;
    animation: slide 0.6s both;

    .work-overview-cards {
      display: flex;
      flex-direction: column;
      width: 33%;
      height: 100%;
      flex-shrink: 0;
      color: rgba(255, 255, 255, .9);

      .work-card {
        padding: 10px 16px;
        background-color: $cardBackgroundColor;
        border-radius: 8px;
        cursor: pointer;
        transition: 0.2s;

        .overview-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .work-left {
            display: flex;
            align-items: center;

            .work-icon {
              display: flex;
              align-items: center;
            }

            .overview-detail {
              height: 67px;

              .work-card-title {
                font-weight: 600;
                margin-top: 16px;
                font-size: 14px;
              }

              .work-card-subtitle {
                font-size: 12px;
                font-weight: 500;
              }
            }
          }

          .work-overview-buttons {
            display: flex;
            align-items: center;
            margin-top: 12px;
          }

          .work-start {
            display: flex;
            align-items: center;
          }

          .heart {
            background: none;
            box-shadow: none;
            width: 24px !important;
            padding: 4px;
            color: #83838e;
            border: 1px solid #d8d8d8;
            margin-left: auto;
            margin-bottom: auto;
            margin-right: 0 !important;
          }

          svg {
            width: 46px;
            padding: 10px;
            border-radius: 8px;

            &:first-child {
              width: 42px;
              margin-right: 18px;
            }
          }
        }
      }
    }
  }
}

</style>