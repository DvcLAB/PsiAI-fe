<script>
import vue2Dropzone from "vue2-dropzone";
var Minio = require('minio')
 
// Instantiate the minio client with the endpoint
// and access keys as shown below.
 
 
var s3Client = new Minio.Client({
    endPoint:  's3.dvclab.com',
    accessKey: '7AU2ABLFK9VB2CWZB1JM',
    secretKey: 'WNS7mbQPqdb4l7GJsBcOtOWds5SnesvyleuKIoNl'
})
/**
 * File-manager component
 */
export default {
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      viewUpload: false,
    };
  },
  components: {vueDropzone: vue2Dropzone},
  methods: {
    createBucket(){
      // Make a bucket called mybucket.
      s3Client.makeBucket('mybucket', 'us-east-1', function(err){
        if (err) return console.log('Error creating bucket.', err)
        console.log('Bucket created successfully in "us-east-1".')
      })

      // 列举某一bucket中的文件
      // var stream = s3Client.listObjects('newbucket','', true)
      // stream.on('data', function(obj) { console.log(obj) } )
      // stream.on('error', function(err) { console.log(err) } )
      // return this.$request.put('ip');
      // bucket列表
      // s3Client.listBuckets(function(err, buckets) {
      //   if (err) return console.log(err)
      //   console.log('buckets :', buckets)
      // })


    },
    uploadFile() {
      this.viewUpload = true
    },
    returnViewFile() {
      this.viewUpload = false
    }
  },
};
</script>

<template>
    <div class="d-xl-flex">
      <div class="w-100">
        <div class="d-md-flex">
          <div class="w-100">
            <div class="card">
              <!-- 文件浏览 -->
              <div class="card-body" v-if="!viewUpload">
                <div>
                  <div class="row mb-3">
                    <div class="col-xl-3 col-sm-6">
                      <div class="mt-2">
                        <h5>文件浏览</h5>
                      </div>
                    </div>
                    <div class="col-xl-9 col-sm-6">
                      <form
                        class="mt-4 mt-sm-0 float-sm-end d-flex align-items-center"
                      > 
                        <!-- <div class="btn btn-primary mb-2" title="上传文件" @click="createBucket">
                          创建bucket
                        </div> -->
                        <div class="search-box mb-2 me-2">
                          <div class="position-relative">
                            <input
                              type="text"
                              class="form-control bg-light border-light rounded"
                              placeholder="搜索文件..."
                            />
                            <i class="bx bx-search-alt search-icon"></i>
                          </div>
                        </div>
                        <div class="btn btn-primary mb-2" title="上传文件">
                          <i class="bx bx-upload " style="font-size: 15px;" @click="uploadFile"></i>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <!-- My File内容，文件浏览 -->
                <div>
                  <div class="row">
                    <div class="col-xl-4 col-sm-6">
                      <div class="card shadow-none border">
                        <div class="card-body p-3">
                          <div class="">
                            <div class="float-end ms-2">
                              <b-dropdown
                                toggle-class="font-size-16 text-muted p-0"
                                menu-class="dropdown-menu-end"
                                class="mb-2"
                                variant="white"
                                right
                              >
                                <template #button-content>
                                  <i class="mdi mdi-dots-horizontal"></i>
                                </template>

                                <b-dropdown-item href="#">Open</b-dropdown-item>
                                <b-dropdown-item href="#">Edit</b-dropdown-item>
                                <b-dropdown-item href="#"
                                  >Rename</b-dropdown-item
                                >
                                <b-dropdown-divider></b-dropdown-divider>
                                <b-dropdown-item href="#"
                                  >Remove</b-dropdown-item
                                >
                              </b-dropdown>
                            </div>
                            <div class="avatar-xs me-3 mb-3">
                              <div class="avatar-title bg-transparent rounded">
                                <i
                                  class="bx bxs-folder font-size-24 text-warning"
                                ></i>
                              </div>
                            </div>
                            <div class="d-flex">
                              <div class="overflow-hidden me-auto">
                                <h5 class="font-size-14 text-truncate mb-1">
                                  <a
                                    href="javascript: void(0);"
                                    class="text-body"
                                    >Design</a
                                  >
                                </h5>
                                <p class="text-muted text-truncate mb-0">
                                  12 Files
                                </p>
                              </div>
                              <div class="align-self-end ms-2">
                                <p class="text-muted mb-0">6GB</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- end col -->

                    <div class="col-xl-4 col-sm-6">
                      <div class="card shadow-none border">
                        <div class="card-body p-3">
                          <div class="">
                            <div class="float-end ms-2">
                              <b-dropdown
                                toggle-class="font-size-16 text-muted p-0"
                                menu-class="dropdown-menu-end"
                                class="mb-2"
                                variant="white"
                                right
                              >
                                <template #button-content>
                                  <i class="mdi mdi-dots-horizontal"></i>
                                </template>

                                <b-dropdown-item href="#">Open</b-dropdown-item>
                                <b-dropdown-item href="#">Edit</b-dropdown-item>
                                <b-dropdown-item href="#"
                                  >Rename</b-dropdown-item
                                >
                                <b-dropdown-divider></b-dropdown-divider>
                                <b-dropdown-item href="#"
                                  >Remove</b-dropdown-item
                                >
                              </b-dropdown>
                            </div>
                            <div class="avatar-xs me-3 mb-3">
                              <div class="avatar-title bg-transparent rounded">
                                <i
                                  class="bx bxs-folder font-size-24 text-warning"
                                ></i>
                              </div>
                            </div>
                            <div class="d-flex">
                              <div class="overflow-hidden me-auto">
                                <h5 class="font-size-14 text-truncate mb-1">
                                  <a
                                    href="javascript: void(0);"
                                    class="text-body"
                                    >Development</a
                                  >
                                </h5>
                                <p class="text-muted text-truncate mb-0">
                                  20 Files
                                </p>
                              </div>
                              <div class="align-self-end ms-2">
                                <p class="text-muted mb-0">8GB</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- end col -->

                    <div class="col-xl-4 col-sm-6">
                      <div class="card shadow-none border">
                        <div class="card-body p-3">
                          <div class="">
                            <div class="float-end ms-2">
                              <b-dropdown
                                toggle-class="font-size-16 text-muted p-0"
                                menu-class="dropdown-menu-end"
                                class="mb-2"
                                variant="white"
                                right
                              >
                                <template #button-content>
                                  <i class="mdi mdi-dots-horizontal"></i>
                                </template>

                                <b-dropdown-item href="#">Open</b-dropdown-item>
                                <b-dropdown-item href="#">Edit</b-dropdown-item>
                                <b-dropdown-item href="#"
                                  >Rename</b-dropdown-item
                                >
                                <b-dropdown-divider></b-dropdown-divider>
                                <b-dropdown-item href="#"
                                  >Remove</b-dropdown-item
                                >
                              </b-dropdown>
                            </div>
                            <div class="avatar-xs me-3 mb-3">
                              <div class="avatar-title bg-transparent rounded">
                                <i
                                  class="bx bxs-folder font-size-24 text-warning"
                                ></i>
                              </div>
                            </div>
                            <div class="d-flex">
                              <div class="overflow-hidden me-auto">
                                <h5 class="font-size-14 text-truncate mb-1">
                                  <a
                                    href="javascript: void(0);"
                                    class="text-body"
                                    >Project A</a
                                  >
                                </h5>
                                <p class="text-muted text-truncate mb-0">
                                  06 Files
                                </p>
                              </div>
                              <div class="align-self-end ms-2">
                                <p class="text-muted mb-0">2GB</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- end col -->

                    <div class="col-xl-4 col-sm-6">
                      <div class="card shadow-none border">
                        <div class="card-body p-3">
                          <div class="">
                            <div class="float-end ms-2">
                              <b-dropdown
                                toggle-class="font-size-16 text-muted p-0"
                                menu-class="dropdown-menu-end"
                                class="mb-2"
                                variant="white"
                                right
                              >
                                <template #button-content>
                                  <i class="mdi mdi-dots-horizontal"></i>
                                </template>

                                <b-dropdown-item href="#">Open</b-dropdown-item>
                                <b-dropdown-item href="#">Edit</b-dropdown-item>
                                <b-dropdown-item href="#"
                                  >Rename</b-dropdown-item
                                >
                                <b-dropdown-divider></b-dropdown-divider>
                                <b-dropdown-item href="#"
                                  >Remove</b-dropdown-item
                                >
                              </b-dropdown>
                            </div>
                            <div class="avatar-xs me-3 mb-3">
                              <div class="avatar-title bg-transparent rounded">
                                <i
                                  class="bx bxs-folder font-size-24 text-warning"
                                ></i>
                              </div>
                            </div>
                            <div class="d-flex">
                              <div class="overflow-hidden me-auto">
                                <h5 class="font-size-14 text-truncate mb-1">
                                  <a
                                    href="javascript: void(0);"
                                    class="text-body"
                                    >Admin</a
                                  >
                                </h5>
                                <p class="text-muted text-truncate mb-0">
                                  08 Files
                                </p>
                              </div>
                              <div class="align-self-end ms-2">
                                <p class="text-muted mb-0">4GB</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- end col -->

                    <div class="col-xl-4 col-sm-6">
                      <div class="card shadow-none border">
                        <div class="card-body p-3">
                          <div class="">
                            <div class="float-end ms-2">
                              <b-dropdown
                                toggle-class="font-size-16 text-muted p-0"
                                menu-class="dropdown-menu-end"
                                class="mb-2"
                                variant="white"
                                right
                              >
                                <template #button-content>
                                  <i class="mdi mdi-dots-horizontal"></i>
                                </template>

                                <b-dropdown-item href="#">Open</b-dropdown-item>
                                <b-dropdown-item href="#">Edit</b-dropdown-item>
                                <b-dropdown-item href="#"
                                  >Rename</b-dropdown-item
                                >
                                <b-dropdown-divider></b-dropdown-divider>
                                <b-dropdown-item href="#"
                                  >Remove</b-dropdown-item
                                >
                              </b-dropdown>
                            </div>
                            <div class="avatar-xs me-3 mb-3">
                              <div class="avatar-title bg-transparent rounded">
                                <i
                                  class="bx bxs-folder font-size-24 text-warning"
                                ></i>
                              </div>
                            </div>
                            <div class="d-flex">
                              <div class="overflow-hidden me-auto">
                                <h5 class="font-size-14 text-truncate mb-1">
                                  <a
                                    href="javascript: void(0);"
                                    class="text-body"
                                    >Sketch Design</a
                                  >
                                </h5>
                                <p class="text-muted text-truncate mb-0">
                                  12 Files
                                </p>
                              </div>
                              <div class="align-self-end ms-2">
                                <p class="text-muted mb-0">6GB</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- end col -->

                    <div class="col-xl-4 col-sm-6">
                      <div class="card shadow-none border">
                        <div class="card-body p-3">
                          <div class="">
                            <div class="float-end ms-2">
                              <b-dropdown
                                menu-class="dropdown-menu-end"
                                toggle-class="font-size-16 text-muted p-0"
                                class="mb-2"
                                variant="white"
                                right
                              >
                                <template #button-content>
                                  <i class="mdi mdi-dots-horizontal"></i>
                                </template>

                                <b-dropdown-item href="#">Open</b-dropdown-item>
                                <b-dropdown-item href="#">Edit</b-dropdown-item>
                                <b-dropdown-item href="#"
                                  >Rename</b-dropdown-item
                                >
                                <b-dropdown-divider></b-dropdown-divider>
                                <b-dropdown-item href="#"
                                  >Remove</b-dropdown-item
                                >
                              </b-dropdown>
                            </div>
                            <div class="avatar-xs me-3 mb-3">
                              <div class="avatar-title bg-transparent rounded">
                                <i
                                  class="bx bxs-folder font-size-24 text-warning"
                                ></i>
                              </div>
                            </div>
                            <div class="d-flex">
                              <div class="overflow-hidden me-auto">
                                <h5 class="font-size-14 text-truncate mb-1">
                                  <a
                                    href="javascript: void(0);"
                                    class="text-body"
                                    >Applications</a
                                  >
                                </h5>
                                <p class="text-muted text-truncate mb-0">
                                  20 Files
                                </p>
                              </div>
                              <div class="align-self-end ms-2">
                                <p class="text-muted mb-0">8GB</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- end col -->
                  </div>
                  <!-- end row -->
                </div>
                 </div>
              <!-- 上传文件 -->
              <div class="row card-body" v-else>
                <div>
                  <div class="row mb-3">
                    <div class="col-xl-3 col-sm-6">
                      <div class="mt-2">
                        <h5>上传文件</h5>
                      </div>
                    </div>
                    <div class="col-xl-9 col-sm-6">
                      <form
                        class="mt-4 mt-sm-0 float-sm-end d-flex align-items-center"
                      >
                        <div class="btn btn-primary mb-2" title="返回">
                          <i class="bx bx-arrow-back" style="font-size: 15px;" @click="returnViewFile"></i>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="mb-4">
                    <!-- <label class="col-form-label col-lg-2">上传文件</label> -->
                    <div>
                      <vue-dropzone
                        id="dropzone"
                        ref="myVueDropzone"
                        :use-custom-slot="true"
                        :options="dropzoneOptions"
                      >
                        <div class="dropzone-custom-content">
                          <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                          <h5>拖拽文件到此处或点击上传</h5>
                        </div>
                      </vue-dropzone>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12 text-center">
                      <button type="submit" class="btn btn-success me-2">上传</button>
                      <button class="btn btn-secondary" @click="returnViewFile">取消</button>
                    </div>
                  </div>
                  
                </div>

              </div>
            </div>
            <!-- end card -->
          </div>
          <!-- end w-100 -->
        </div>
        
      </div>

    </div>
    <!-- end row -->
</template>