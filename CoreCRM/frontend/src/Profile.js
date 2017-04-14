'use strict';
import Vue from 'vue';

const bus = new Vue({});

const vm1 = new Vue({
  el: '#Department',
  data: {
    departments: [],
    selected: 0
  },
  watch: {
    selected: function(newValue, oldValue) {
      let department = this.departments.find((val) => {
        return val.value == newValue;
      });

      bus.$emit('department-changed', department);
    }
  },
  created() {
    let _this = this;
    setTimeout(() => {
      _this.departments = [
        {value: 1, text: '办公室'},
        {value: 2, text: '服务部'},
      ];
      _this.selected = 1;
    }, 100);
  }
});

const vm2 = new Vue({
  el: '#Position',
  data: {
    positions: [],
    selected: 0
  },
  methods: {
    loadPositions: function(department) {
      let _this = this;
      setTimeout(() => {
        _this.positions = [
          {value: 1, text: '岗位1 ' + department.text},
          {value: 2, text: '岗位2 ' + department.text},
        ];
        _this.selected = 1;
      }, 100);
    }
  },
  created() {
    const _this = this;
    bus.$on('department-changed', function(params) {
      _this.loadPositions(params);
    });
  }
});