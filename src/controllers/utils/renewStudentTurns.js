const { Turn } = require('../../db');
const { json } = require('express');

// Asigna turnos a los alumnos automáticamente si ya pagaron y tenían turnos previos iguales.
export const renewStudentTurns = async (studentId, fromMonth, toMonth, year) => {
  const previousTurns = await UserTurn.findAll({
    where: {studentId, month: fromMonth, year}
  })

  for (const turn of previousTurns){
    await UserTurn.create({
      studentId,
      turnId: turn.turnId,
      month: toMonth,
      year,
      isPaid: true
    })


    const t = await Turn.findByPk(turn.turnId);
    await t.increment('currentStudents');
  }
} 