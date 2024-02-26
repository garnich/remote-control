import DBStorage from "../db/storage";

export const updateWinnersHandler = () => {
  const winners = DBStorage.getWinners();
  return JSON.stringify({
        type: 'update_winners',
        data: JSON.stringify(winners),
        id: 0,
      });
}