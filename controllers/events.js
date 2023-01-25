import { response } from "express";
import Event from "../models/Events.js";

export const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");

  return res.status(200).json({
    ok: true,
    events,
  });
};

export const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const savedEvent = await event.save();

    return res.status(201).json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "comuníquese con el administrador",
    });
  }
};

export const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const userID = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un evento con el ID enviado",
      });
    }

    if (event.user.toString() !== userID) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene las credenciales para editar este evento",
      });
    }

    const newEvent = {
      ...req.body,
      user: userID,
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      event: updatedEvent,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "comuníquese con el administrador",
    });
  }
};

export const deleteEvent = async(req, res = response) => {
  const eventId = req.params.id;
  const userID = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un evento con el ID enviado",
      });
    }

    if (event.user.toString() !== userID) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene las credenciales para eliminar este evento",
      });
    }

    const deletedEvent = await Event.findByIdAndDelete(eventId)

    return res.status(200).json({
      ok: true,
      event: deletedEvent,
      msg: 'Evento eliminado'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "comuníquese con el administrador",
    });
  }

};
