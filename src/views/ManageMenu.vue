<template>
  <div class="main">
    <el-row class="filter-box">
      <el-col :span="2">姓名</el-col>
      <el-col :span="2"><el-input v-model="name"></el-input></el-col>
      <el-col :span="2">性别</el-col>
      <el-col :span="2"><el-input></el-input></el-col>
      <el-col :span="2">部门</el-col>
      <el-col :span="2"><el-input></el-input></el-col>
      <el-col :span="2">职务</el-col>
      <el-col :span="2"><el-input></el-input></el-col>
      <el-col :span="2">是否启用</el-col>
      <el-col :span="2"><el-input></el-input></el-col>
    </el-row>
    <el-row class="filter-box">
      <el-col :span="2">教育水平</el-col>
      <el-col :span="2"><el-input></el-input></el-col>
      <el-col :span="2">入职时间</el-col>
      <el-col :span="2"><el-input></el-input></el-col>
      <el-col :span="2">离职时间</el-col>
      <el-col :span="2"><el-input></el-input></el-col>
      <el-col :span="2">手机号</el-col>
      <el-col :span="2"><el-input></el-input></el-col>
      <el-col :span="5">
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >
        </el-button>
        <el-button type="primary"><i class="el-icon-brush"></i></el-button
      ></el-col>
    </el-row>
    <el-row class="handle-box">
      <el-button type="danger" size="small" @click="handleAdd">添加</el-button>
      <el-button type="primary" size="small">导出</el-button>
      <el-button type="primary" size="small">职务管理</el-button>
    </el-row>
    <div class="table-box">
      <el-table
        border
        :data="showTableData"
        style="width: 100%"
        :header-cell-style="{ background: '#f2f2f2' }"
      >
        <el-table-column
          fixed
          prop="name"
          label="姓名"
          width="150"
          background
        />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="sex" label="性别" width="120" />
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column prop="job" label="职务" width="220" />
        <el-table-column prop="qq" label="QQ" width="220" />
        <el-table-column prop="wx" label="WX" width="220" />
        <el-table-column prop="phone" label="联系电话" width="220" />
        <el-table-column fixed="right" label="操作" width="80">
          <template #default>
            <!-- <el-button type="text" size="small" @click="handleClick"
              >Detail</el-button
            > -->
            <el-button type="text" size="small"
              ><i class="el-icon-s-order" style="font-size: 20px"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :total="tableData.length"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        v-model:current-page="currentPage1"
      ></el-pagination>
      <!-- <el-pagination
      v-model:currentPage="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination> -->
    </div>
  </div>
  <el-dialog title="添加" v-model="addVisible">
    <el-form :rules="rules" ref="addForm" :model="addForm">
      <el-row class="add-form">
        <el-col :span="12">
          <el-form-item label="姓名" label-width="100px" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="学历" label-width="100px" prop="degree">
            <el-select v-model="addForm.degree" placeholder="请选择">
              <el-option label="本科" value="本科"> </el-option>
              <el-option label="专科" value="专科"> </el-option>
              <el-option label="博士" value="博士"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码" label-width="100px" prop="phone">
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="100px" prop="password">
            <el-input type="password" v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="职务" label-width="100px" prop="job">
            <el-select v-model="addForm.job" placeholder="请选择">
              <el-option label="客服" value="客服"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="WX" label-width="100px" prop="WX">
            <el-input v-model="addForm.WX"></el-input>
          </el-form-item>
          <el-form-item label="离职时间" label-width="100px">
            <el-date-picker
              v-model="addForm.leaveData"
              type="date"
              placeholder="选择日期时间"
              align="right"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="删除标志" label-width="100px" prop="deleteSign">
            <el-radio v-model="addForm.deleteSign" label="是" size="medium"
              >是</el-radio
            >
            <el-radio v-model="addForm.deleteSign" label="否" size="medium"
              >否</el-radio
            >
          </el-form-item></el-col
        >
        <el-col :span="12">
          <el-form-item label="性别" label-width="100px">
            <el-select v-model="addForm.sex" placeholder="请选择">
              <el-option label="男" value="男"> </el-option>
              <el-option label="女" value="女"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄" label-width="100px" prop="age">
            <el-input-number v-model="addForm.age" :min="18" :max="60" />
          </el-form-item>
          <el-form-item label="登录用户名" label-width="100px" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="部门" label-width="100px" prop="department">
            <el-select v-model="addForm.department" placeholder="请选择">
              <el-option label="售后" value="售后"> </el-option>
              <el-option label="经理办" value="经理办"> </el-option>
              <el-option label="技术开发" value="博士"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="QQ" label-width="100px" prop="qq">
            <el-input v-model="addForm.qq"></el-input>
          </el-form-item>
          <el-form-item label="入职时间" label-width="100px">
            <el-date-picker
              v-model="addForm.joinData"
              type="date"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd"
              class="el-date-picker-fixed"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="是否启用" label-width="100px" prop="isEnable">
            <el-radio v-model="addForm.isEnable" label="是" size="medium"
              >是</el-radio
            >
            <el-radio v-model="addForm.isEnable" label="否" size="medium"
              >否</el-radio
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span class="dialog-footer">
      <el-button @click="addVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveAdd('addForm')">确 定</el-button>
    </span></el-dialog
  >
</template>
<script>
export default {
  data() {
    /* 
    验证手机号码
    */
    var validatePhonenumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写手机号码"));
      } else {
        const reg = /^1[3|5|7|8|9][0-9]{9}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号码"));
        }
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写密码"));
      } else {
        const reg = /^[a-zA-Z0-9_]{6,18}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("6-18个字符，仅包含数字、字母或下划线"));
        }
      }
    };

    return {
      name: "",
      queryCondition: {
        name: "",
        sex: "",
        department: "",
        job: "",
        isEnable: "",
        degree: "",
        joinDate: "",
        leaveDate: "",
        phone: "",
      },
      tableData: [],
      currentPage: 1,
      currentPage1: 1,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      pageSize: 5,
      showTableData: [],
      usernameList: [],
      addVisible: false,
      addForm: {
        // id: 0,
        name: "",
        username: "wangfangyi",
        sex: "男",
        department: "售后",
        job: "客服",
        qq: "",
        wx: "",
        phone: "15012341234",
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 18,
            message: "长度在 2 到 18 个字符",
            trigger: "blur",
          },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 18,
            message: "长度在 2 到 18 个字符",
            trigger: "blur",
          },
        ],
        qq: [
          {
            type: "number",
            message: "请输入正确的qq号码",
            trigger: "blur",
          },
        ],

        sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
        // age: [{type:"number", message: "请输入", trigger: "blur" }],
        degree: [{ required: true, message: "请选择学历", trigger: "blur" }],
        department: [
          { required: true, message: "请选择部门", trigger: "blur" },
        ],
        job: [{ required: true, message: "请选择职务", trigger: "blur" }],
        isEnable: [{ required: true, message: "请选择", trigger: "blur" }],
        deleteSign: [{ required: true, message: "请选择", trigger: "blur" }],

        password: [
          {
            min: 6,
            max: 18,
            validator: validatePassword,
            message: "6-18个字符，仅包含数字、字母或下划线",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入正确的手机号码",
            validator: validatePhonenumber,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleClick() {
      console.log("click");
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.showTableData = this.tableData.slice(
        (val - 1) * this.pageSize,
        (val - 1) * this.pageSize + this.pageSize
      );
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.showTableData = this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        (this.currentPage - 1) * this.pageSize + this.pageSize
      );
    },
    handleAdd() {
      this.addVisible = true;
    },
    saveAdd(formName) {
      /* 验证是否通过 */
      this.$refs[formName].validate((valid) => {
        console.log(this.addForm, valid);
        if (valid) {
          /* 验证用户名是否已存在 */

          if (this.usernameList.indexOf(this.addForm.username) != -1) {
            this.$message.error("用户名已存在，请更换用户名");
          } else {
            console.log("通过验证");
            this.tableData.push(this.addForm);
            this.usernameList.push(this.addForm.username);
            this.$message.success(`添加成功`);
          }
          // this.addVisible = false;
          // this.addForm = {};
        } else {
          console.error("error submit!!");
          return false;
        }
      });

      // console.log(this.addForm);
      // this.tableData.push(this.addForm);
      // this.$message.success(`添加成功`);
      // this.addVisible = false;
      // this.addForm = {};
    },
  },
  mounted() {
    let data = [
      {
        name: "王方义",
        username: "wangfangyi",
        sex: "男",
        department: "售后",
        job: "客服",
        qq: "",
        wx: "",
        phone: "15012341234",
      },
    ];
    for (var i = 0; i < 18; i++) {
      data.push({
        name: "席鹏飞",
        username: "xipf",
        sex: "女",
        department: "技术研发",
        job: "软件工程师",
        qq: i,
        wx: "",
        phone: "17113368981",
      });
    }
    this.tableData = data;
    this.showTableData = this.tableData.slice(0, this.pageSize);
    for (let i = 0; i < this.tableData.length; i++) {
      this.usernameList.push(this.tableData[i].username);
    }
  },
};
</script>
<style>
.add-form .el-input .el-input__inner {
  width: 180px !important;
}
.add-form .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  position: relative;
  right: -20px;
  /* margin-right: 0; */
}
</style>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 660px;
  // background-color: rgb(229, 230, 181);
  margin: 0 auto;
  padding: 0;
  .filter-box {
    background-color: #fff;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 16px;
    line-height: 20px;
    margin: 5px auto;
    // width: 90%;
    // .el-input__inner {
    //   margin: 5px;
    // }
  }
  .handle-box {
    background-color: #f2f2f2;
    .el-button {
      margin: 3px 10px;
    }
  }
  .table-box {
    min-height: 500px;
  }
  .pagination-box {
    height: 50px;
  }
}
.add-form {
  height: 500px;
}
</style>
