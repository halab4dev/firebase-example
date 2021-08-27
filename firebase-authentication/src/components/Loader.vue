<template>
  <div class="loader-container">
    <div class="loader">
    </div>
    <div class="loader-text">Loading ...</div>
  </div>
</template>

<script>
export default {
  name: "Loader"
}
</script>

<style scoped>

.loader-container {
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.75;
  width: 100%;
  height: 100%;
  text-align: center;
}
.loader {
  opacity: 1;
  margin: 100px auto auto auto;
  border: 1px solid #f3f3f3;
  border-radius: 50%;
  border-top: 1px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  -webkit-box-shadow: 0px 0px 20px 1px rgba(18,129,255,0.57), 0px 0px 20px 1px rgba(18,129,255,0.57) inset;
  box-shadow: 0px 0px 20px 5px rgba(18,129,255,0.57), 0px 0px 20px 5px rgba(18,129,255,0.57) inset;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader-text {
  position: absolute;
  width: 100%;
  top: 150px;
  opacity: 1;
  color: white;
  text-shadow:
    #3498db 0px 0px 20px,
    #3498db 0px 0px 30px,
    #3498db 0px 0px 40px,
    #3498db 0px 0px 50px,
    #3498db 0px 0px 75px,
  #FFF 0px 0px 5px,
  #FFF 0px 0px 10px,
  #FFF 0px 0px 15px,
    2px 2px 2px rgba(23,78,206,0);
  ;
}
</style>