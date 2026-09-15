import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase.config";

const bookedSlotsRef = collection(db, "bookedSlots");

export const createAppointment = async (appointment) => {
  const appointmentId = [
    appointment.doctorId,
    appointment.date,
    appointment.time,
  ].join("_");

  const appointmentRef = doc(
    db,
    "appointments",
    appointmentId
  );

  const bookedSlotRef = doc(
    db,
    "bookedSlots",
    appointmentId
  );

  await runTransaction(db, async (transaction) => {
    const bookedSlotSnapshot =
      await transaction.get(bookedSlotRef);

    if (bookedSlotSnapshot.exists()) {
      throw new Error(
        "This appointment slot has already been booked. Please choose another time."
      );
    }

    transaction.set(bookedSlotRef, {
  userId: appointment.userId,
  doctorId: appointment.doctorId,
  date: appointment.date,
  time: appointment.time,
  status: "confirmed",
  createdAt: serverTimestamp(),
});

    transaction.set(appointmentRef, {
      ...appointment,
      status: "confirmed",
      createdAt: serverTimestamp(),
    });
  });

  return appointmentId;
};

export const getBookedAppointments = async (
  doctorId,
  date
) => {
  const q = query(
    bookedSlotsRef,
    where("doctorId", "==", doctorId),
    where("date", "==", date),
    where("status", "==", "confirmed")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

export const getAppointmentById = async (
  appointmentId
) => {
  const appointmentRef = doc(
    db,
    "appointments",
    appointmentId
  );

  const snapshot = await getDoc(appointmentRef);

  if (!snapshot.exists()) {
    throw new Error("Appointment not found.");
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const getUserAppointments = async (userId) => {
  const q = query(
    collection(db, "appointments"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

export const cancelAppointment = async (
  appointmentId,
  userId
) => {
  const appointmentRef = doc(
    db,
    "appointments",
    appointmentId
  );

  const bookedSlotRef = doc(
    db,
    "bookedSlots",
    appointmentId
  );

  await runTransaction(db, async (transaction) => {
    const appointmentSnapshot =
      await transaction.get(appointmentRef);

    if (!appointmentSnapshot.exists()) {
      throw new Error("Appointment not found.");
    }

    const appointment =
      appointmentSnapshot.data();

    if (appointment.userId !== userId) {
      throw new Error(
        "You are not authorized to cancel this appointment."
      );
    }

    if (appointment.status === "cancelled") {
      throw new Error(
        "This appointment has already been cancelled."
      );
    }

    if (appointment.status !== "confirmed") {
      throw new Error(
        "This appointment cannot be cancelled."
      );
    }

    transaction.update(appointmentRef, {
      status: "cancelled",
      cancelledAt: serverTimestamp(),
    });

    transaction.delete(bookedSlotRef);
  });
};

export const getAllAppointments = async () => {
  const snapshot = await getDocs(
    collection(db, "appointments")
  );

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

export const updateAppointmentStatus = async (
  appointmentId,
  status
) => {
  const appointmentRef = doc(
    db,
    "appointments",
    appointmentId
  );

  if (
    !["confirmed", "completed", "cancelled"].includes(
      status
    )
  ) {
    throw new Error("Invalid appointment status.");
  }

  await runTransaction(db, async (transaction) => {
    const appointmentSnapshot =
      await transaction.get(appointmentRef);

    if (!appointmentSnapshot.exists()) {
      throw new Error("Appointment not found.");
    }

    const appointment =
      appointmentSnapshot.data();

    if (appointment.status === "cancelled") {
      throw new Error(
        "A cancelled appointment cannot be updated."
      );
    }

    transaction.update(appointmentRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  });
};