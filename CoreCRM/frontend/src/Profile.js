'use strict';
import Vue from 'vue';
import API from './api';

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
    API.loadDepartments(this);
  }
});

const vm2 = new Vue({
  el: '#Position',
  data: {
    positions: [],
    selected: 0
  },
  created() {
    const _this = this;
    bus.$on('department-changed', function(params) {
      API.loadPositions(_this, params);
    });
  }
});