import React from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { IModal } from "@interfaces/IModal";
import { useDispatch, useSelector } from "react-redux";
import { remove as removeETask } from "@api/task";

import { removeTask, remove } from "@store/slices/tasksSlice";
import { RootState } from "@store/store";
import { showError, showInfo } from "@lib/ToastMessages";

export default function DeleteModal({ state, setState, toast }: IModal) {
  const task = useSelector((state: RootState) => state.tasks.dataSelected);

  const dispatch = useDispatch();

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">Eliminar</span>
    </div>
  );

  const footerContent = (
    <div>
      <Button
        label="Cancelar"
        severity="danger"
        onClick={() => handleClose()}
      />
      <Button label="Eliminar" onClick={() => handleDelete()} />
    </div>
  );

  const handleDelete = async () => {
    try {
      await removeETask(task._id);
      dispatch(removeTask(task._id));
      handleClose();
      showInfo(toast, "", "Tarea eliminada");
    } catch {
      showError(toast, "", "Ha ocurrido un error, contacte con soporte.");
    }
  };

  const handleClose = async () => {
    dispatch(remove());
    setState(!state);
  };

  return (
    <Dialog
      visible={state}
      modal
      header={headerElement}
      footer={footerContent}
      closable={false}
      style={{ width: "30rem" }}
      onHide={() => {
        if (!state) return;
        setState(false);
      }}
    >
      <p>¿Estás seguro de eliminar este registro?</p>
    </Dialog>
  );
}
