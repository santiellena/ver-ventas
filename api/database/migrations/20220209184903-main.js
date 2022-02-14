'use strict';

const { GLOBAL_TABLE, globalSchema} = require('../../components/global/model');
const { DOC_TYPE_TABLE, docTypeSchema } = require('../../components/docTypes/model');
const { UNIT_MEASURE_TABLE, unitMeasureSchema } = require('../../components/unitMeasures/model');
const { DEPARTMENT_TABLE, departmentSchema } = require('../../components/departments/model');
const { BRANCH_TABLE, branchSchema } = require('../../components/branches/model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(GLOBAL_TABLE, globalSchema);
    await queryInterface.createTable(DOC_TYPE_TABLE, docTypeSchema);
    await queryInterface.createTable(UNIT_MEASURE_TABLE, unitMeasureSchema);
    await queryInterface.createTable(DEPARTMENT_TABLE, departmentSchema);    
    await queryInterface.createTable(BRANCH_TABLE, branchSchema);
  },
  async down (queryInterface) {
    await queryInterface.drop(GLOBAL_TABLE);
    await queryInterface.drop(DOC_TYPE_TABLE);
    await queryInterface.drop(UNIT_MEASURE_TABLE);
    await queryInterface.drop(DEPARTMENT_TABLE);
    await queryInterface.drop(BRANCH_TABLE);
  }
};
