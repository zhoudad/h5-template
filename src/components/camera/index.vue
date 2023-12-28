<script setup lang="ts">
import { BrowserMultiFormatReader } from '@zxing/library';
import { Icon } from 'tdesign-icons-vue-next';

const emits = defineEmits(['change', 'close']);

function initReader() {
  const codeReader = new BrowserMultiFormatReader();

  return codeReader
    .listVideoInputDevices()
    .then((videoInputDevices) => {
      if (videoInputDevices.length <= 0) throw new Error('妹找到摄像头啊');

      return {
        videoDeviceID: videoInputDevices[0].deviceId,
        codeReader,
      };
    })
    .catch((err) => {
      console.log(err);
    });
}

function decode(codeReader, selectedDeviceId) {
  codeReader
    .decodeFromInputVideoDevice(selectedDeviceId, 'video')
    .then((result) => {
      // console.log(result)
      emits('change', result.text);
      close();
    })
    .catch((_err) => {
      // setMessage(err.toString())
    });
}

function readerClose() {
  emits('close');
}

const reader = ref();
const deviceID = ref();
onMounted(async () => {
  if (!reader.value) {
    const { videoDeviceID, codeReader }: any = await initReader();
    reader.value = codeReader;
    deviceID.value = videoDeviceID;
  }
});

function start() {
  decode(reader.value, deviceID.value);
}

function close() {
  reader.value.reset();
}

defineExpose({
  start,
  close,
});
</script>

<template>
  <div class="page-scan">
    <!-- 扫码区域 -->
    <div class="QrCode">
      <video id="video" ref="video" height="100%" width="100%" autoplay />
    </div>
    <!-- 扫码样式一 -->
    <div class="Qr_scanner">
      <div class="close-wrap" @click="readerClose">
        <Icon name="close" size="18px" color="#ffffff" />
      </div>
      <div class="box">
        <div class="line_row">
          <div class="line" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.QrCode {
  width: 100vw;
  height: 100vh;
  position: relative;
  #video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

// 二维码动画

.Qr_scanner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;

  width: 100%;
  height: 100%;
  // position: relative;
  background-color: rgba(0, 0, 0, 0.5);
}

.close-wrap {
  position: absolute;
  width: 32px;
  height: 32px;
  top: 12vw;
  left: 12vw;
  background-color: rgba(136, 176, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.Qr_scanner .box {
  width: 75vw;
  height: 75vw;
  max-height: 75vh;
  max-width: 75vh;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  // overflow: hidden;
  border: 1px solid #337dff;

  .line_row {
    width: 100%;
    overflow: hidden;

    background-image: linear-gradient(
        0deg,
        transparent 24%,
        rgba(136, 176, 255, 0.1) 25%,
        rgba(136, 176, 255, 0.1) 26%,
        transparent 27%,
        transparent 74%,
        rgba(136, 176, 255, 0.1) 75%,
        rgba(136, 176, 255, 0.1) 76%,
        transparent 77%,
        transparent
      ),
      linear-gradient(
        90deg,
        transparent 24%,
        rgba(136, 176, 255, 0.1) 25%,
        rgba(136, 176, 255, 0.1) 26%,
        transparent 27%,
        transparent 74%,
        rgba(136, 176, 255, 0.1) 75%,
        rgba(136, 176, 255, 0.1) 76%,
        transparent 77%,
        transparent
      );
    background-size: 3rem 3rem;
    background-position: -1rem -1rem;
    animation: Heightchange 2s infinite;
    animation-timing-function: cubic-bezier(0.53, 0, 0.43, 0.99);
    animation-delay: 1.4s;
    border-bottom: 1px solid rgba(136, 176, 255, 0.1);
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
}

.Qr_scanner .line {
  width: 100%;
  height: 3px;
  background: #2b71fe;

  filter: blur(4px);
}

.Qr_scanner .box:after,
.Qr_scanner .box:before,
.Qr_scanner .angle:after,
.Qr_scanner .angle:before {
  content: '';
  display: block;
  position: absolute;
  width: 78px;
  height: 78px;

  border: 0.3rem solid transparent;
}

.Qr_scanner .box:after,
.Qr_scanner .box:before {
  top: -7px;
  border-top-color: #2b71fe;
}

.Qr_scanner .angle:after,
.Qr_scanner .angle:before {
  bottom: -7px;
  border-bottom-color: #2b71fe;
}

.Qr_scanner .box:before,
.Qr_scanner .angle:before {
  left: -7px;
  border-left-color: #2b71fe;
}

.Qr_scanner .box:after,
.Qr_scanner .angle:after {
  right: -7px;
  border-right-color: #2b71fe;
}

@keyframes radar-beam {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
}
@keyframes Heightchange {
  0% {
    height: 0;
  }

  100% {
    height: 100%;
  }
}
</style>
