/* eslint-disable import/prefer-default-export */
export const calculateCommonTotal = (outgoings, incomings) => {
  const commonOutgoingTotal = Object.keys(outgoings).reduce((prevTotal, key) => (
    prevTotal + parseFloat(outgoings[key].value)
  ), 0);
  const commonIncomingTotal = Object.keys(incomings).reduce((prevTotal, key) => (
    prevTotal + parseFloat(incomings[key].value)
  ), 0);
  return commonIncomingTotal - commonOutgoingTotal;
};
