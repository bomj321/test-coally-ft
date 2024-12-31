"use client";

import { useDispatch, useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import Image from "next/image";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { setTask, setTasks } from "@store/slices/tasksSlice";
import { ITask } from "@interfaces/ITask";
import BasicStates from "@components/TableExtensions/BasicStates";
import BasicActions from "@components/TableExtensions/BasicActions";
import DeleteModal from "@components/Modals/DeleteModal";
import { RootState } from "@store/store";
import TaskModal from "@components/Modals/TaskModal";
import { CutText } from "@lib/CutText";
import { findAll } from "@api/task";
import { showError } from "@lib/ToastMessages";
import { InputSwitch } from "primereact/inputswitch";
import { State } from "@enums/StateEnum";

const Dashboard = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const tasks = useSelector((state: RootState) => state.tasks.data);
  const [checked, setChecked] = useState(true);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalClose, setOpenModalClose] = useState<boolean>(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const getData = async () => {
    try {
      const state = checked ? State.COMPLETED : State.TO_DO;
      const params = { state };
      const res = await findAll(params);
      dispatch(setTasks(res.data));
    } catch {
      showError(toast, "", "Ha ocurrido un error, contacte con soporte.");
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/", redirect: true });
  };

  //Elements to Header
  const start = (
    <Image
      alt="logo"
      src="https://coally.com/wp-content/uploads/2023/09/Horizontal-Version-Principal-1-300x89.png"
      width="150"
      height="60"
      className="mr-2 border-circle"
    ></Image>
  );

  const end = (
    <div className="flex align-items-center gap-2">
      <Button label="Salir" onClick={() => handleLogout()} />
    </div>
  );

  //Button events

  const handleEdit = (data: ITask) => {
    dispatch(setTask(data));
    setOpenModal(true);
  };

  const handleModalDelete = (data: ITask) => {
    dispatch(setTask(data));
    setOpenModalClose(true);
  };

  return (
    <>
      <header className="card mb-5">
        <Menubar start={start} end={end} />
      </header>

      <Toast ref={toast} />

      <TaskModal
        state={openModal}
        setState={(e) => setOpenModal(e)}
        toast={toast}
      />
      <DeleteModal
        state={openModalClose}
        setState={(e) => setOpenModalClose(e)}
        toast={toast}
      />

      <div className="w-full flex justify-content-between mb-3">
        <Button
          onClick={() => setOpenModal(true)}
          icon="pi pi-plus"
          label="Tarea"
        />

        <InputSwitch
          checked={checked}
          className="mr-3"
          onChange={(e) => setChecked(e.value)}
        />
      </div>

      <DataTable
        emptyMessage="Sin tareas"
        value={tasks}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="_id" header="Id"></Column>
        <Column
          field="title"
          header="Título"
          body={(rowData) => CutText(rowData.title)}
        ></Column>
        <Column
          field="description"
          header="Descripción"
          body={(rowData) => CutText(rowData.description)}
        ></Column>

        <Column
          field="state"
          body={(rowData: ITask) => <BasicStates state={rowData.state} />}
          header="Estado"
        ></Column>

        <Column
          body={(rowData) => (
            <BasicActions
              handleEdit={() => handleEdit(rowData)}
              handleDelete={() => handleModalDelete(rowData)}
            ></BasicActions>
          )}
          header="Acciones"
        ></Column>
      </DataTable>
    </>
  );
};

export default Dashboard;
