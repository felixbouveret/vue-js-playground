<template>
  <section class="root">
    <div class="button">
      <label class="switch">
        <input type="checkbox" />
        <span class="slider"></span>
      </label>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.root {
  width: 100%;
  height: 100vh;
  min-height: 700px;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.button {
  margin-top: 25px;
  text-align: center;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: grey;
  transition: 0.5s;
  border-radius: 200px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
</style>
