<template>
  <div class="about">
    <div class="list">
      <div class="user-info-card">
        <div class="card-header">
          <div class="card-cover"
               style="background-image: url('/logo.png')"/>
          <img class="card-avatar" src="/logo.png" alt="avatar">
          <p class="card-fullname">叁柒 Mwq</p>
          <p class="card-jobtitle">学生</p>
        </div>
      </div>
      <div class="theme-info-card">
        <div class="item">
          <div class="theme-cover"/>
          <div class="tips">主题</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About"
}
</script>

<style lang="stylus" scoped>
.about {
  padding: 40px;

  .list {
    display: flex;
    justify-content: space-between;

    .tips {
      opacity: .8;
      font-size: 14px;
      margin-bottom: 8px;
      color: rgba(255,255,255,0.9);
    }

    .theme-info-card {
      position: relative;
      width: 72%;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      box-shadow: 0 8px 16px -4px #00000050;
      overflow: hidden;

      .item {
        padding: 20px 30px

        .theme-cover {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          will-change: top;
          background: rgba(10, 12, 25, 0.3);
          filter: blur(5px);
          transition: 0.5s;
        }
      }
    }

    .user-info-card {
      width: 25%;
      overflow: hidden;
      background-color: white;
      display: flex;
      transition: 0.3s;
      flex-direction: column;
      border-radius: 10px;
      box-shadow: 0 8px 16px -4px #00000050;

      .card-header {
        position: relative;
        display: flex;
        height: 200px;
        flex-shrink: 0;
        width: 100%;
        transition: 0.3s;

        .card-cover {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          will-change: top;
          background-size: cover;
          background-position: center;
          filter: blur(25px);
          transform: scale(1.2);
          transition: 0.5s;
        }

        .card-avatar {
          width: 100px;
          height: 100px;
          box-shadow: 0 8px 8px rgba(0, 0, 0, .2);
          border-radius: 50%;
          -o-object-position: center;
          object-position: center;
          -o-object-fit: cover;
          object-fit: cover;
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%) translateY(-64px);
        }

        .card-fullname {
          position: absolute;
          bottom: 0;
          font-size: 22px;
          font-weight: 700;
          text-align: center;
          white-space: nowrap;
          transform: translateY(-10px) translateX(-50%);
          left: 50%;
          color: #2b2c48;
        }

        .card-jobtitle {
          position: absolute;
          bottom: 0;
          font-size: 11px;
          white-space: nowrap;
          font-weight: 500;
          opacity: 0.7;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin: 0;
          left: 50%;
          transform: translateX(-50%) translateY(-7px);
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>