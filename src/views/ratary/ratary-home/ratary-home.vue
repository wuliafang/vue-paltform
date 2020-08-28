// 轮转首页
<template>
  <div class="ratary-home">
    <div class="department-info">
      <div>
        当前科室
        <span style="float:right;padding-bottom:20px;" @click="changeDepart">
          切换科室
        </span>
      </div>
      <div class="depart-name">
        {{ infoList.department_name?infoList.department_name:"无" }}
      </div>
      <div>
        <span>待入科学员：{{ infoList.wait_num }}</span>   |  <span>轮转中学员：{{ infoList.round_num }}</span>
      </div>
    </div>
    <!-- 菜单 -->
    <div class="menu">
      <div class="item">
        <div class="menu-item" v-for="(item,index) in menu" :key="index">
          <span class="info-hini" v-if="item.info != ''">{{ item.info }}</span>
          <img :src="item.icon" alt="">
          <div class="item-theme">
            {{ item.theme }}
          </div>
        </div>
      </div>
    </div>
    <div class="cut-off">
    </div>
    <!-- 重要信息 -->
    <div class="info-module">
      <div class="block">
        <div class="importance-info">
          重要消息
        </div>
        <div class="detail-info" v-for="(item,index) in message" :key="index" @click="handleCheck(item)">
          <div class="title-box">
            <span class="title">{{ item.title_name }}</span>
            <span class="no-read" v-if="item.read_state == 0"><i></i> 未读</span>
            <span class="yet-read" v-if="item.read_state == 1"><i></i> 已读</span>
          </div>
          <div class="station-box">
            <span>
              <!-- <span class="depart">呼吸内科</span> -->
              <span class="site">{{ item.content }}</span>
            </span>
            <span>{{ item.msg_time }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 切换科室 -->
    <van-action-sheet
      v-model="showDepart"
      :actions="departList"
      cancel-text="取消"
      @select="onSelectDepart"
      @cancel="onCancel"
    />
  </div>
</template>
<script>
  // import { getUserInfor, setUserInfor } from "@/util/auth";
  // // import { mapState, mapActions } from 'vuex'
  // import { distributeHome, messageList, readMessage, departList} from '@/api/ratary/ratary-home'
  export default {
    name: 'RataryHome',
    components: {},
    data(){
      return {
        active: 1,
        infoList: { // 科室信息
          department_name: '',
          wait_num: '',
          round_num: ''
        },
        message: [], // 消息列表
        showDepart: false,  // 显示科室列表状态
        departList: [],   // 科室列表
        selDepartId: "",
        menu: [
          {
            theme: '学员报到',
            // icon: require('../../../assets/img/ratary/1.png'),
            path: '/trainees-report',
            info: '',
            role: [] // 带教老师和教秘都有权限
          },
          {
            theme: '内容审批',
            // icon: require('../../../assets/img/ratary/2.png'),
            path: '/content-approval',
            info: '',
            role: ["72"] // 只有带教老师
          },
          {
            theme: '出科考试',
            // icon: require('../../../assets/img/ratary/3.png'),
            path: '/anytime-exam',
            info: '',
            role: []
          },
          {
            theme: '出科审核',
            // icon: require('../../../assets/img/ratary/4.png'),
            path: '/outer-audit',
            info: '',
            role: []
          },
          {
            theme: '分配导师',
            // icon: require('../../../assets/img/ratary/5.png'),
            path: '/assign-mentor',
            info: '',
            role: ["74", "75"] // 教秘和科主任
          },
          // {
          //   theme: '考试评价',
          //   icon: require('../../../assets/img/ratary/6.png'),
          //   path: '/exam-evaluate',
          //   info: '',
          //   role: []
          // },
          {
            theme: '教学活动',
            // icon: require('../../../assets/img/ratary/7.png'),
            path: '/activity-list',
            info: '',
            role: []
          }
        ],
        firstRole: [72],   // 一级审核角色
        secondRole: [74, 75],   // 二级审核角色
        allowRole: [72, 73, 74, 75],     // 72带教老师，73责任导师，74教秘 75科主任
        roleList: [],
        allowRoleList: []
      }
    },
    created() {
      this.hasShowTab = this.$route.query.type&&this.$route.query.type!=1;
      this.getDepartList();
    },
    mounted() {
      document.querySelector('#headerTitle').innerHTML = '首页';
      let roleList = getUserInfor().role;
      roleList.forEach(element => {
        this.roleList.push(element.role);
        if (this.firstRole.includes(Number(element.role))){
          this.isTeachRole=true;
          } else if (this.secondRole.includes(Number(element.role))){
          this.isSecretary=true;
        }
        if (this.allowRole.includes(Number(element.role))){
          this.allowRoleList.push(element.role);
        } 
      });
      // console.log(this.allowRoleList);
    },
    methods: {

      jumpPage(url){
        /* if (url == 10){ // 教师考试反馈
           location.href = "/curefun-appointment/dist/#/testFeedback"
           return 
        } */
        // 学员报到，内容审批，出科考试，出科审核，分配导师，教学活动，都需要有科室信息才能操作
        // 本地存储取不到科室id
        if (!getUserInfor().selDepartId&&!sessionStorage.getItem("selDepartId")){
          this.$toast.fail('当前用户没有科室');
          return
        } else {
          this.$router.push({path: url});
        }
        
      },
      //  权限控制
      permissionControl(role) {
         // 空数组代表全部有权限
         let show = false;
        if (role.length !=0) {
            role.forEach(item => {
              if (this.roleList.includes(item)) {
                show =  true;
              } 
            })
            return show;
         } else {
            return true;
         } 
      },
      // 轮转首页 获取人数
      async distributeHome() {
        let res = await distributeHome({role: this.roleList, rd_id: this.selDepartId});
        if (res) {
            if (res.data.list_info.length > 0) {
              // this.departList=res.data.list_info;
                this.infoList = res.data.list_info[0]
            }
        }
      },

      // 出科审核消息列表
      async messageList() {
        let res = await messageList({role: this.roleList, rd_id: this.selDepartId})
        if (res) {
           this.message = res.data.list
        }
      },

      // 点击消息标记已读 并跳转到出科审核详情页
      handleCheck(obj) {
        this.readMessage(obj.resourec_id);
        // 表示是出科审核数据
        if (obj.msg_type==3){
           // 审核状态 2带教老师待审核 3带教老师不通过 4带教老师通过；教秘待审批 5教秘不通过 6教秘通过
          let path = null
          if (this.isTeachRole){
            if (obj.approval_state==4&&this.isSecretary){
              // 审核通过
              path='/outer-audit/topdetail';
            } else {
              path='/outer-audit/detail'
            }   
          } else if (this.isSecretary){
            // 包含第二级审核角色
            path='/outer-audit/topdetail';
          }
          this.$router.push({path: path, query: {rid: obj.resourec_id, state: obj.approval_state}})
        } else if (obj.msg_type==4){
            // 教学活动数据
          this.$router.push({path: '/activity-list/detail', query: {id: obj.resourec_id}})
        }
        
      },

      // 消息阅读
      async readMessage(id) {
        //  request_type请求类型1 app端得请求 2 H5教师端得请求
        let res = await readMessage({msg_id: id, request_type: "2"});
        if (!res) return;
        this.messageList();
      },
      //  切换科室
      changeDepart(){
        this.showDepart = true;
      },
      // 科室列表取消
      onCancel() {
        this.showDepart = false;
      },
      // 选择科室id
      onSelectDepart(item){
        this.selDepartId=item.value;
        // debugger
        // 获取轮转学员数
        this.distributeHome();
        // 获取消息数
        this.messageList();
        this.showDepart = false;
        this.storeDepartId();
        
        
      },
      // 存储科室id
      storeDepartId(){
        const userInfo=getUserInfor();
        userInfo.selDepartId=this.selDepartId;
        setUserInfor(userInfo);
        // 为适配安卓，localstorage存储存在问题，在session 在存一遍
        sessionStorage.setItem("selDepartId", this.selDepartId);

        // 通知app
        // this.noticeApp();
      },
      // 获取角色下的科室
      async getDepartList(){
        // 获取存储的科室ID
        let departIdformUser=""
        if (getUserInfor()&&getUserInfor().selDepartId||sessionStorage.getItem("selDepartId")){
        departIdformUser=getUserInfor().selDepartId||sessionStorage.getItem("selDepartId");
        }
        let selectIndex=0;
        let data = {
             org_id: getUserInfor().h_id[0],
             role: this.allowRoleList
        }
        let res = await departList(data);
        if (res.data.length==0) return
        this.departLis=[];
        res.data.forEach((item, index) => {
          let obj = {
            value: item.rd_id,
            name: item.rd_name
          }
          if (departIdformUser&&item.rd_id==departIdformUser) selectIndex=index;
          this.departList.push(obj)
        })
        this.onSelectDepart(this.departList[selectIndex]);
        this.storeDepartId();
      },
      // 暂时不需要
      noticeApp(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
        // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
      

        if (isAndroid){
          window.WebViewJavascriptBridge.callHandler(
                'selDepartId'
                ,  this.selDepartId
                , function(responseData) {}
          );
        } 
      }
    }
  };
</script>
<style scoped lang="scss">
  .ratary-home {
      background-color: #fff;;
    .department-info {
      width: 100%;
      min-height: 160px;
      background: linear-gradient(90deg, #434C68, #757E97);
      color: #fff;
      font-size: 12px;
      padding:28px 21px 48px 21px;
      .depart-name {
        font-weight:800;
        font-size: 28px;
        margin: 10px 0;
      }
    
    }

    .menu {
      width: 100%;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      background-color: #fff;
      margin-top: -20px;
      overflow: hidden;

      .item {
        padding: 20px 3px 0 3px;
        // display: flex;
        // justify-content: space-between;
        .menu-item {
          width: 25%;
          float: left;
          color: #333;
          font-size: 12px;
          text-align: center;
          margin-bottom: 20px;
          // margin-right: 46px;
          position: relative;
          display: none;
          &.show{
            display: inline-block;
          }
          img {
            width: 24px;
            height: 24px;
            display: inline-block;
            margin-bottom: 9px;
          }
          .info-hini {
            background-color: #ED5348;
            color: #fff;
            display: inline-block;
            font-size: 9px;
            padding: 2px 5px;
            border-radius:50%;
            position: absolute;
            right: 20px;
            top: -5px;
          }
        }
      }
      // .item-new {
      //     float: left !important;
      //     .menu-item{
      //       margin-right: 46px !important;
      //     }
      //   }
    }

    .cut-off {
      height: 10px;
      background-color: #F6F7FA;
    }

    .info-module {
      .block {
        margin: 20px 16px 0 16px;

        .importance-info {
          color: #333333;
          font-size: 17px;
          font-weight:bold;
        }

        .detail-info {
          padding-bottom: 20px;
          margin-top: 20px;
          border-bottom: 1px solid #DDDDDD; /*no*/
          color: #999999;

          .title-box {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;

            .title {
              color: #333333;
              font-weight:bold;
              font-size: 15px;
            }
            // 未读
            .no-read {
              color: #666666;
              i {
                height: 8px;
                width: 8px;
                display: inline-block;
                background-color: #ED5348;
                border-radius:50%;
              }
            } 
            // 已读
            .yet-read {
              color: #999999;
              i {
                height: 8px;
                width: 8px;
                display: inline-block;
                background-color: #999999;
                border-radius:50%;
              }
            }
            
          }

          .station-box {
            display: flex;
            justify-content: space-between;

            .depart {
              color: #fff;
              font-size: 11px;
              padding: 5px 12px;
              background:#9C9DB2;
              border-radius:10px;
            }

            .site {
              color: #666666;
              font-size: 12px;
              // padding-left: 5px;
            }
          }
        }

        .detail-info:last-child {
          border-bottom: none;
        }
      }
    }
  }

</style>
