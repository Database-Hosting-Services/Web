import { Handle, Position } from "@xyflow/react";
import { Link } from "react-router-dom";

import {
  externalLinkIcon,
  tableIcon,
  isUniqueIcon,
  isPrimaryKeyIcon,
  isIdentityIcon,
  isNullableIcon,
  isNotNullIcon,
} from "../assets";

import { tmpColumns } from "../data/tmp";

const Table = ({ data }) => {
  const { tableId, tableName = "tmp name", columns = tmpColumns } = data;

  // columns : [ {ColumnName: "", dataType: "", isNullable: false, isPrimaryKey: false, isUnique: false, isIdentity: false} ]

  return (
    <div className="flex flex-col rounded-lg w-[322px] overflow-hidden text-white">
      <TableHead tableName={tableName} tableId={tableId} />
      {columns.map((item, index) => {
        if (item.isId === true) {
          return (
            <div style={{ position: "relative" }} key={index}>
              <Handle
                type="source"
                position={Position.Left}
                style={{ opacity: 0 }}
              />
              <TableRow ColumnName={item.ColumnName} dataType={item.dataType} />
            </div>
          );
        }
        return (
          <TableRow
            key={index}
            ColumnName={item.ColumnName}
            dataType={item.dataType}
            isPrimaryKey={item.isPrimaryKey}
            isNullable={item.isNullable}
            isUnique={item.isUnique}
            isIdentity={item.isIdentity}
          />
        );
      })}
    </div>
  );
};

const TableHead = ({ tableId, tableName }) => {
  return (
    <div className="flex justify-between items-center bg-secondary p-3">
      <div className="flex gap-3">
        <img src={tableIcon} alt="table" />
        <p>{tableName}</p>
      </div>
      <div className="table-actions">
        <Link to={`../table-editor/`}>
          <img src={externalLinkIcon} alt="view table" />
        </Link>
        {/* <Link to={`../table-editor/${tableId}`}>*</Link> */}
      </div>
    </div>
  );
};

const TableRow = ({
  ColumnName,
  dataType,
  isPrimaryKey,
  isNullable,
  isUnique,
  isIdentity,
}) => {
  return (
    <div className="flex justify-between items-center bg-tertiary p-3 border-[#06071a] border-b-1 border-solid">
      <div className="flex gap-3">
        {isPrimaryKey && <img src={isPrimaryKeyIcon} alt="Primary Key" />}
        {isUnique && <img src={isUniqueIcon} alt="Unique" />}
        {isIdentity && <img src={isIdentityIcon} alt="Identity" />}
        {isNullable ? (
          <img src={isNullableIcon} alt="Nullable" />
        ) : (
          <img src={isNotNullIcon} alt="Not Null" />
        )}
        <p>{ColumnName}</p>
      </div>
      <div className="dataType">{dataType}</div>
    </div>
  );
};

export default Table;
