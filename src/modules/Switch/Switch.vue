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
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
  min-height: 700px;
  overflow-x: hidden;
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
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  border-radius: 200px;

  background: grey;
  cursor: pointer;

  transition: 0.5s;
}
.slider:before {
  position: absolute;
  bottom: 4px;
  left: 4px;

  width: 26px;
  height: 26px;
  border-radius: 50%;

  background-color: white;

  -webkit-transition: 0.4s;
  transition: 0.4s;

  content: "";
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
