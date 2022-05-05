import React, { useState } from 'react';
import styled from 'styled-components';
import { largeBuildingTypeList } from '../../lib/staticData';
import palette from '../../styles/palette';
import Select from '../common/Select';

const Container = styled.div`
  border: 1px solid red;
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 58px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
    padding-left: 3px;
  }
  label {
    /* color: red; */
  }
  select {
    /* margin-top: 100px; */
  }
`;

const RegisterRoomBuilding = () => {
  const [largeBuildingType, setLargeBuildingType] = useState('');
  const [buildingType, setBuildingType] = useState('');

  const onChangeLargeBuildingType = (e) => {
    setLargeBuildingType(e.target.value);
  };
  const onChangeBuildingType = (e) => {
    setBuildingType(e.target.value);
  };

  return (
    <Container>
      <h2>What kind of place will you host?</h2>
      <h3>Step 1.</h3>
      <Select
        label="Type of host"
        defaultValue="Choose one"
        options={largeBuildingTypeList}
        isValid={!!largeBuildingType}
        useValidation
        type="register"
        onChange={onChangeLargeBuildingType}
      />
      <Select
        label="Type of building"
        defaultValue="Choose one"
        options={largeBuildingTypeList}
        isValid={!!buildingType}
        useValidation
        type="register"
        onChange={onChangeBuildingType}
      />
    </Container>
  );
};

export default RegisterRoomBuilding;
