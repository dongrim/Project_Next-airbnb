import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux/store';
import styled from 'styled-components';
import { largeBuildingTypeList, buildingTypeLists } from '../../lib/staticData';
import palette from '../../styles/palette';
import Select from '../common/Select';
import { registerRoomActions } from '../../redux/store/registerRoomSlice';

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
  }

  .register-room-building-selector-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }
`;

const disabledLargeBuildingTypeOptions = ['Choose one'];

const RegisterRoomBuilding: React.FC = () => {
  const { largeBuildingType, buildingType } = useSelector((state) => state.registerRoom);
  const dispatch = useDispatch();

  const onChangeLargeBuildingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setLargeBuildingType(event.target.value));
    dispatch(registerRoomActions.setBuildingType(''));
  };

  const onChangeBuildingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setBuildingType(event.target.value));
  };

  const createBuildingOptions = useMemo(() => {
    let indexOfLargeBuilding;
    let createBuildingType;

    for (const key in largeBuildingTypeList) {
      // if (largeBuildingTypeList[key] === largeBuildingType) indexOfLargeBuilding = key;
      largeBuildingTypeList[key] === largeBuildingType && (indexOfLargeBuilding = key);
    }
    buildingTypeLists.forEach((building) => {
      building.type === indexOfLargeBuilding && (createBuildingType = building.value);
    });

    return createBuildingType;
  }, [largeBuildingType]);

  return (
    <Container>
      <h2>What kind of place will you host?</h2>
      <h3>Step 1.</h3>
      <div className="register-room-building-selector-wrapper">
        <Select
          type="register"
          // value={largeBuildingType || undefined}
          defaultValue="Choose one"
          disabledOptions={disabledLargeBuildingTypeOptions}
          label="Type of host"
          options={Object.values(largeBuildingTypeList)}
          isValid={!!largeBuildingType}
          useValidation
          onChange={onChangeLargeBuildingType}
        />
      </div>
      <div className="register-room-building-selector-wrapper">
        <Select
          type="register"
          // value={buildingType || undefined}
          defaultValue="Choose one"
          label="Type of building"
          options={createBuildingOptions}
          isValid={!!buildingType}
          useValidation
          disabled={!largeBuildingType}
          onChange={onChangeBuildingType}
        />
      </div>
    </Container>
  );
};

export default RegisterRoomBuilding;
