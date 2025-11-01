// @ts-check

const { Turn } = require('../db');
const { json } = require('express');
const { getDaysOfMonth, getWeekNumberInMonth } = require('./utils/calendarDataLoader');
const { Op } = require('sequelize');

//GET api/turns/
const getTurns = async (req, res) => {
  try{
    const allTurns = await Turn.findAll(); // instructorId no existe, entonces tira error si hago ({include: ["instructorId"]})

    if(allTurns){
      res.send(allTurns);
    }
    else {
      res.status(400).json({ message: 'Error al intentar obtener los turnos' })
    }
  }
  catch (error){
    console.error('Error interno al intentar obtener los turnos:', error)
    res.status(500).json({ message: 'Error interno al intentar obtener los turnos' })
  }
}

// GET api/turns/:year/:month
const getTurnsByMonth = async (req, res) => {
  try{
    const {year, month} = req.query;

    if(!year || !month){
      return res.status(400).json({ message: 'Error no se enviaron todos los datos requeridos' })
    }

    const turns = await Turn.findAll({
      where: {
        year: parseInt(year),
        month
      }
    })

    console.log("turns: ", {turns})

    res.send(turns);
  }
  catch(error){
    res.status(500).json({message: 'Error al obtener los turnos del mes' })
  }
}

// GET api/turns/:year/:month/:weekNumber
const getTurnsByWeek = async (req, res) => {
  try{
    const {year, month, weekNumber} = req.query;

    if(!year || !month || !weekNumber){
      return res.status(400).json({ message: 'Error no se enviaron todos los datos requeridos' })
    }

    const turns = await Turn.findAll({
      where: {
        weekNumber: parseInt(weekNumber),
        month,
        year: parseInt(year)
      },
    })

    res.send(turns);
  }
  catch(error){
    res.status(500).json({message: 'Error al obtener los turnos del mes' })
  }
}

// POST
const generateTurnsForMonth = async (req, res) => {
  try {
    const { monthNumber, monthName, year } = req.body;

    if (!monthNumber || !monthName || !year) {
      return res.status(400).json({
        message: 'Faltan datos requeridos: monthNumber, monthName, year',
      })
    }

    // Validar si ya existen turnos para ese mes/año
    const existing = await Turn.findOne({
      where: { month: monthName, year },
    })

    if (existing) {
      return res.status(400).json({
        message: `Ya existen turnos creados para ${monthName} ${year}`,
      })
    }

    const days = getDaysOfMonth(year, monthNumber)
    const turns = []
    const DEFAULT_HOURS = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00'
    ]

    for (const { date, dayOfWeek } of days) {
      const weekNumber = getWeekNumberInMonth(date)

      for (const hour of DEFAULT_HOURS) {
        turns.push({
          dayOfWeek,
          hour,
          weekNumber,
          month: monthName,
          year,
          status: 'blocked',
          capacity: 5,
          currentStudents: 0,
          isVisibleToStudents: false,
          instructorId: null,
        })
      }
    }

    await Turn.bulkCreate(turns)

    res.status(201).json({
      message: `Turnos de ${monthName} ${year} generados correctamente`,
      created: turns.length,
    })
  } catch (error) {
    console.error('Error generando turnos:', error)
    res.status(500).json({ message: 'Error interno al generar turnos' })
  }
}

module.exports = {
  getTurns,
  getTurnsByMonth,
  getTurnsByWeek,
  generateTurnsForMonth,
}