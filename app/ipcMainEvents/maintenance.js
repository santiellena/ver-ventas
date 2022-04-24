const { ipcMain, dialog } = require("electron");

const {
  mainHandlebars,
  historyHandlebars,
  returnMainWindow,
  returnGeneralMaintenanceWindow,
  returnBrancesMaintenanceWindow,
  returnEmployeesWindow,
  returnAddEmployeesWindow,
  returnEditEmployeesWindow,
  returnEditUserWindow,
  returnUsersWindow,
  returnAddUserWindow,
  returnDocsWindow,
  returnUnitsWindow,
} = require("../createWindows");

const storeMaintenance = require("../components/maintenance/store");
const storeDocTypes = require("../components/docTypes/store");
const storeEmployees = require("../components/employees/store");
const storeUsers = require("../components/users/store");
const storeUnitMeasures = require("../components/unitMeasures/store");
const auth = require('../config/auth');

const {
  getBranchDataFromConfig,
  updateBranchName,
  returnToken,
} = require("../config/config");

module.exports = ({
  createGeneralMaintenanceWindow,
  createBranchesMaintenanceWindow,
  createEmployeesWindow,
  createAddEmplooyWindow,
  createEditEmplooyWindow,
  createUsersWindow,
  createAddUserWindow,
  createEditUserWindow,
  createDocsWindow,
  createUnitsWindow,
}) => {
  ipcMain.on("load-general-window", async () => {
    const token = returnToken();
    const general = await storeMaintenance.getGeneralInfo(token);
    createGeneralMaintenanceWindow({ general });
  });

  ipcMain.handle(
    "update-general-info",
    async (e, { fantasyName, businessName, taxName, taxPercentage }) => {
      if (fantasyName && businessName && taxName && taxPercentage) {
        const update = await storeMaintenance.updateGeneralInfo({
          fantasyName,
          businessName,
          taxName,
          taxPercentage,
        });

        if (update) {
          return update;
        } else {
          return null;
        }
      }
    }
  );

  ipcMain.on("load-branches-window", async () => {
    const branches = await storeMaintenance.getAllBranches();
    const branch = getBranchDataFromConfig();
    createBranchesMaintenanceWindow({ branches, branch });
  });

  ipcMain.handle(
    "update-branch-info", async (e, 
      {
        idBranch,
        branchName,
        cuit,
        dirStreet,
        phoneNumber,
        email,
        representative,
      }
    ) => {
      if (
        idBranch &&
        branchName &&
        cuit &&
        dirStreet &&
        phoneNumber &&
        email &&
        representative
      ) {
        const branch = getBranchDataFromConfig();
        const update = await storeMaintenance.updateBranchInfo({
          idBranch,
          branchName,
          cuit,
          dirStreet,
          phoneNumber,
          email,
          representative,
        });

        if (branch.id == update.id) {
          updateBranchName(update.name);
        }

        return update;
      }
    }
  );

  ipcMain.on("load-employees-window", async () => {
    const employees = await storeEmployees.getEmployees();
    createEmployeesWindow({ employees });
  });

  ipcMain.on("load-addemplooy-window", async () => {
    const docTypes = await storeDocTypes.getAllDocTypes();
    if (docTypes) {
      createAddEmplooyWindow({ docTypes });
    }
  });

  ipcMain.on("load-editemplooy-window", async (e, id) => {
    if (id) {
      const emplooy = await storeEmployees.getEmplooy(id);
      const docTypes = await storeDocTypes.getAllDocTypes();
      if (emplooy && docTypes) {
        createEditEmplooyWindow({ emplooy, docTypes });
      }
    }
  });

  let addedEmplooy;
  ipcMain.on(
    "add-emplooy",
    async (
      e,
      {
        name,
        lastname,
        docTypeId,
        numDoc,
        email,
        dirStreet,
        phoneNumber,
        birthDate,
        login,
        password,
      }
    ) => {
      const newEmplooy = await storeEmployees.newEmplooy({
        name,
        lastname,
        docType: docTypeId,
        numDoc,
        email,
        dirStreet,
        phoneNumber,
        birthDate,
        login,
        password,
      });
      if (newEmplooy) {
        const addEmplooyWindow = returnAddEmployeesWindow();
        addEmplooyWindow.close();

        addedEmplooy = newEmplooy;
        const employeesWindow = returnEmployeesWindow();
        employeesWindow.webContents.send("load-new-emplooy");
      }
    }
  );

  ipcMain.handle("get-added-emplooy", () => {
    const added = addedEmplooy;
    delete addedEmplooy;
    return added;
  });

  ipcMain.on("delete-emplooy", async (e, id) => {
    if (id) {
      const emplooy = await storeEmployees.getEmplooy(id);

      if (emplooy) {
        const editEmplooyWindow = returnEditEmployeesWindow();
        
        const response = dialog.showMessageBoxSync(editEmplooyWindow, {
          title: `ELIMINAR EMPLEADO`,
          message: `Eliminar EMPLEADO: ${emplooy.lastname}, ${emplooy.name}`,
          buttons: ["Confirmar", "Cancelar"],
        });

        if (response == 0) {
          await storeEmployees.deleteEmplooy(id);

          editEmplooyWindow.close();

          const employeesWindow = returnEmployeesWindow();
          employeesWindow.webContents.send("delete-emplooy-selected");
        }
      }
    }
  });

  let pivotEmplooyEdited;
  ipcMain.handle(
    "edit-emplooy",
    async (
      e,
      {
        id,
        name,
        lastname,
        docTypeId,
        numDoc,
        email,
        dirStreet,
        phoneNumber,
        birthDate,
      }
    ) => {
      
        const update = await storeEmployees.updateEmplooy({
          id,
          name,
          lastname,
          docType: docTypeId,
          numDoc,
          email,
          dirStreet,
          phoneNumber,
          birthDate,
        });

        pivotEmplooyEdited = update;

        const employeesWindow = returnEmployeesWindow();
        employeesWindow.webContents.send("load-edited-emplooy");

        return update;
    }
  );

  ipcMain.handle("get-edited-emplooy", () => {
    const edited = pivotEmplooyEdited;
    delete pivotEmplooyEdited;
    return edited;
  });

  ipcMain.on("load-users-window", async () => {
    const users = await storeUsers.getAllUsers();
    const withbranch = users.map(user => {
      let branchName = "";
      for (let i = 0; i < user.branches.length; i++) {
        if (i == 0) branchName += `${user.branches[i].name}`
        else branchName += `, ${user.branches[i].name}`;
      };

      const emplooy = user.emplooy;
      user.branchName = branchName;
      user.name = emplooy.name;
      user.lastname = emplooy.lastname;
      user.email = emplooy.email;
      return user;
    });
    createUsersWindow({ users: withbranch });
  });

  ipcMain.on("load-adduser-window", async () => {
    const employees = await storeEmployees.getEmployeesToUser();
    const branches = await storeMaintenance.getAllBranches();
    createAddUserWindow({ employees, branches });
  });

  ipcMain.on("load-edituser-window", async (e, id) => {
    const user = await storeUsers.getUser(id);
    const emplooy = await storeEmployees.getEmplooy(user.idEmplooy);
    const branches = await storeMaintenance.getAllBranches();

    if (user && emplooy && branches) {
      createEditUserWindow({ user, branches, emplooy });
    }
  });

  ipcMain.handle("get-branches-selected-byuser", async (e, idUser) => {
    if (idUser) {
      const user = await storeUsers.getUser(idUser);
      return user.branches;
    }
  });

  ipcMain.handle("get-user-permissions", async (e, idUser) => {
    if (idUser) {
      const permissions = await storeUsers.getPermissions(idUser);

      return permissions;
    }
  });

  let idDeletedUserPivot;
  ipcMain.on("delete-user", async (e, idUser) => {
    if (idUser) {
      const user = await storeUsers.getUser(idUser);
      const editUserWindow = returnEditUserWindow();

      const actualUserSession = await auth.getUserSessionInfo();

      if (actualUserSession.id == idUser) {
        dialog.showMessageBoxSync(editUserWindow, {
          title: "ATENCIÓN!",
          message: "No puede eliminar su propio usuario",
        });
      } else {
        const response = dialog.showMessageBoxSync(editUserWindow, {
          title: `ELIMINAR USUARIO ${user.emplooy.name}`,
          message: `Seguro que desea eliminar este usuario? ${user.emplooy.name}, ${user.emplooy.lastname}`,
          buttons: ["Confirmar", "Cancelar"],
        });

        if (response == 0) {
          await storeUsers.deleteUser(idUser);
          const usersWindow = returnUsersWindow();
          usersWindow.webContents.send("update-userslist-bydelete");
          editUserWindow.close();
          idDeletedUserPivot = idUser;
        }
      }
    }
  });

  ipcMain.handle("get-user-deleted", () => {
    const idDeleted = idDeletedUserPivot;
    delete idDeletedUserPivot;
    return idDeleted;
  });

  let newUser;
  ipcMain.on(
    "add-user",
    async (e, { permissions, idEmplooy, branches, username, password }) => {
      if (permissions && idEmplooy && branches && username && password) {
        const userType = await storeUsers.getEmplooyType();
        const added = await storeUsers.addUser({
          idEmplooy,
          idUserType: userType.id,
          branches,
          password,
          username,
          menuStock: permissions.menuStock,
          menuBuys: permissions.menuBuys,
          menuSells: permissions.menuSells,
          menuMaintenance: permissions.menuMaintenance,
          menuQueries: permissions.menuQuery,
          menuAdmin: permissions.menuAdmin,
          menuInvoicing: permissions.menuInvoicing,
        });
        if (added) {
          const addUserWindow = returnAddUserWindow();
          addUserWindow.close();

          const emplooy = await storeEmployees.getEmplooy(added.idEmplooy);
          const branchName = await storeMaintenance.getBranches(added.id);

          const shower = {
            id: added.id,
            name: emplooy.name,
            lastname: emplooy.lastname,
            email: emplooy.email,
            branchName,
          };

          if (emplooy && branchName) {
            newUser = shower;
            const usersWindow = returnUsersWindow();
            usersWindow.webContents.send("update-userslist-bynew");
          }
        }
      }
    }
  );

  ipcMain.handle("get-added-user", () => {
    const added = newUser;
    delete newUser;
    return added;
  });

  ipcMain.handle("get-all-branches", async () => {
    const branches = await storeMaintenance.getAllBranches();
    return branches;
  });

  ipcMain.on("load-docs-window", async () => {
    const docTypes = await storeDocTypes.getAllDocTypes();
    createDocsWindow({ docTypes });
  });

  ipcMain.on("load-units-window", async () => {
    const measures = await storeUnitMeasures.getAllMeasures();
    createUnitsWindow({ measures });
  });

  ipcMain.handle("new-docType", async (e, newName) => {
    return await storeDocTypes.addDocType(newName);
  });

  ipcMain.on("delete-docType", async (e, id) => {
    if (id) {
      await storeDocTypes.deleteDocType(id);
    }
  });

  ipcMain.on("delete-unitMeasure", async (e, id) => {
    if (id) {
      await storeUnitMeasures.deleteMeasure(id);
    }
  });

  ipcMain.handle(
    "new-unitMeasure",
    async (e, { shortDescription, longDescription }) => {
      if (longDescription && shortDescription) {
        return await storeUnitMeasures.addMeasure({
          shortDescription,
          longDescription,
        });
      }
    }
  );

  ipcMain.handle("get-branches", async () => {
    const branches = await storeMaintenance.getAllBranches();
    return branches;
  });

  ipcMain.handle(
    "edit-user",
    async (
      e,
      {
        id,
        username,
        branches,
        password,
        menuStock,
        menuAdmin,
        menuBuys,
        menuMaintenance,
        menuSells,
        menuInvoicing,
        menuQueries,
      }
    ) => {
      if (
        id &&
        username &&
        branches &&
        password &&
        menuStock != null &&
        menuAdmin != null &&
        menuBuys != null &&
        menuMaintenance != null &&
        menuSells != null &&
        menuInvoicing != null &&
        menuQueries != null
      ) {
        const edit = await storeUsers.updateUser({
          id,
          username,
          branches,
          password,
          menuStock,
          menuAdmin,
          menuBuys,
          menuMaintenance,
          menuSells,
          menuInvoicing,
          menuQueries,
        });
        return edit;
      } else return null;
    }
  );
};
