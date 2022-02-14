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

const {
  getBranchDataFromConfig,
  updateBranchName,
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
  ipcMain.on("load-general-window", () => {
    const general = storeMaintenance.getGeneralInfo();
    createGeneralMaintenanceWindow({ general });
  });

  ipcMain.handle(
    "update-general-info",
    (e, { fantasyName, bussinesName, taxName, taxPercentage }) => {
      if (fantasyName && bussinesName && taxName && taxPercentage) {
        const update = storeMaintenance.updateGeneralInfo({
          fantasyName,
          bussinesName,
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

  ipcMain.on("load-branches-window", () => {
    const branches = storeMaintenance.getAllBranches();
    const branch = getBranchDataFromConfig();
    createBranchesMaintenanceWindow({ branches, branch });
  });

  ipcMain.handle(
    "update-branch-info",
    (
      e,
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
        const update = storeMaintenance.updateBranchInfo({
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

  ipcMain.on("load-employees-window", () => {
    const employees = storeEmployees.getEmployees();
    createEmployeesWindow({ employees });
  });

  ipcMain.on("load-addemplooy-window", () => {
    const docTypes = storeDocTypes.getAllDocTypes();
    if (docTypes) {
      createAddEmplooyWindow({ docTypes });
    }
  });

  ipcMain.on("load-editemplooy-window", (e, id) => {
    if (id) {
      const emplooy = storeEmployees.getEmplooy(id);
      const docTypes = storeDocTypes.getAllDocTypes();
      if (emplooy && docTypes) {
        createEditEmplooyWindow({ emplooy, docTypes });
      }
    }
  });

  let addedEmplooy;
  ipcMain.on(
    "add-emplooy",
    (
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
      const docType = storeDocTypes.getDocType(docTypeId);
      const newEmplooy = storeEmployees.newEmplooy({
        name,
        lastname,
        docType,
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

  ipcMain.on("delete-emplooy", (e, id) => {
    if (id) {
      const emplooy = storeEmployees.getEmplooy(id);

      if (emplooy) {
        const editEmplooyWindow = returnEditEmployeesWindow();

        const response = dialog.showMessageBoxSync(editEmplooyWindow, {
          title: `ELIMINAR EMPLEADO`,
          message: `Eliminar EMPLEADO: ${emplooy.lastname}, ${emplooy.name}`,
          buttons: ["Confirmar", "Cancelar"],
        });

        if (response == 0) {
          storeEmployees.deleteEmplooy(id);

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
    (
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
        login,
        password,
      }
    ) => {
      const docType = storeDocTypes.getDocType(docTypeId);
      if (docType) {
        const update = storeEmployees.updateEmplooy({
          id,
          name,
          lastname,
          docType,
          numDoc,
          email,
          dirStreet,
          phoneNumber,
          birthDate,
          login,
          password,
        });

        pivotEmplooyEdited = update;

        const employeesWindow = returnEmployeesWindow();
        employeesWindow.webContents.send("load-edited-emplooy");

        return update;
      } else return null;
    }
  );

  ipcMain.handle("get-edited-emplooy", () => {
    const edited = pivotEmplooyEdited;
    delete pivotEmplooyEdited;
    return edited;
  });

  ipcMain.on("load-users-window", () => {
    const users = storeUsers.getAllUsers();
    const iterable = Object.values(users);
    const withbranch = iterable.map((user) => {
      let branchName = "";
      for (let i = 0; i < user.branches.length; i++) {
        const branch = storeMaintenance.getBranch(user.branches[i]);
        if (i == 0) branchName += `${branch.name}`;
        else branchName += `, ${branch.name}`;
      }

      const emplooy = storeEmployees.getEmplooy(user.idEmplooy);
      user.branchName = branchName;
      user.name = emplooy.name;
      user.lastname = emplooy.lastname;
      user.email = emplooy.email;
      return user;
    });
    createUsersWindow({ users: withbranch });
  });

  ipcMain.on("load-adduser-window", () => {
    const employees = storeEmployees.getEmployeesToUser();
    const branches = storeMaintenance.getAllBranches();
    createAddUserWindow({ employees, branches });
  });

  ipcMain.on("load-edituser-window", (e, id) => {
    const user = storeUsers.getUser(id);
    const emplooy = storeEmployees.getEmplooy(user.idEmplooy);
    const branches = storeMaintenance.getAllBranches();

    if (user && emplooy && branches) {
      createEditUserWindow({ user, branches, emplooy });
    }
  });

  ipcMain.handle("get-branches-selected-byuser", (e, idUser) => {
    if (idUser) {
      const user = storeUsers.getUser(idUser);
      return storeMaintenance.getBranches(user.branches);
    }
  });

  ipcMain.handle("get-user-permissions", (e, idUser) => {
    if (idUser) {
      const permissions = storeUsers.getPermissions(idUser);

      return permissions;
    }
  });

  let idDeletedUserPivot;
  ipcMain.on("delete-user", (e, idUser) => {
    if (idUser) {
      const user = storeUsers.getUser(idUser);
      const editUserWindow = returnEditUserWindow();

      const actualUserSession = { id: 1, name: "Administrador" }; // Modificar cuando se implementen sesiones

      if (actualUserSession.id == idUser) {
        dialog.showMessageBoxSync(editUserWindow, {
          title: "ATENCIÓN!",
          message: "No puede eliminar su propio usuario",
        });
      } else {
        const response = dialog.showMessageBoxSync(editUserWindow, {
          title: `ELIMINAR USUARIO ${user.name}`,
          message: `Seguro que desea eliminar este usuario? ${user.name}, ${user.lastname}`,
          buttons: ["Confirmar", "Cancelar"],
        });

        if (response == 0) {
          storeUsers.deleteUser(idUser);
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
    (e, { permissions, idEmplooy, branches, username, password }) => {
      if (permissions && idEmplooy && branches && username && password) {
        const idUserType = storeUsers.getEmplooyType().id;
        const added = storeUsers.addUser({
          idEmplooy,
          idUserType,
          branches,
          password,
          username,
          menuStock: permissions.menuStock,
          menuBuys: permissions.menuBuys,
          menuSells: permissions.menuSells,
          menuMaintenance: permissions.menuMaintenance,
          menuQuery: permissions.menuQuery,
          menuAdmin: permissions.menuAdmin,
          menuInvoicing: permissions.menuInvoicing,
        });
        if (added) {
          const addUserWindow = returnAddUserWindow();
          addUserWindow.close();

          const emplooy = storeEmployees.getEmplooy(added.idEmplooy);
          const allowedBranches = storeMaintenance.getBranches(added.branches);

          let branchName = "";

          for (const branch of allowedBranches) {
            branchName += `${branch.name}, `;
          }

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

  ipcMain.handle("get-all-branches", () => {
    const branches = storeMaintenance.getAllBranches();
    return branches;
  });

  ipcMain.on("load-docs-window", () => {
    const docTypes = storeDocTypes.getAllDocTypes();
    createDocsWindow({ docTypes });
  });

  ipcMain.on("load-units-window", () => {
    const measures = storeUnitMeasures.getAllMeasures();
    createUnitsWindow({ measures });
  });

  ipcMain.handle("new-docType", (e, newName) => {
    return storeDocTypes.addDocType(newName);
  });

  ipcMain.on("delete-docType", (e, id) => {
    if (id) {
      storeDocTypes.deleteDocType(id);
    }
  });

  ipcMain.on("delete-unitMeasure", (e, id) => {
    if (id) {
      storeUnitMeasures.deleteMeasure(id);
    }
  });

  ipcMain.handle(
    "new-unitMeasure",
    (e, { shortDescription, longDescription }) => {
      if (longDescription && shortDescription) {
        return storeUnitMeasures.addMeasure({
          shortDescription,
          longDescription,
        });
      }
    }
  );

  ipcMain.handle("get-branches", () => {
    const branches = storeMaintenance.getAllBranches();
    return branches;
  });

  ipcMain.handle(
    "edit-user",
    (
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
        menuStats,
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
        menuStats != null
      ) {
        const edit = storeUsers.updateUser({
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
          menuStats,
        });
        return edit;
      } else return null;
    }
  );
};
