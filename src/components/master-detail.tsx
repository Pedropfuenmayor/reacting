import React, { createContext, ReactNode, useState, useContext } from "react";

type MasterDetailProps = {
  children: JSX.Element[];
};

type ItemProps = {
  children: ReactNode;
  payload: { [key: string]: any };
};

type DetailProps = {
  children: (payload: { [key: string]: any }) => JSX.Element;
};

type ContextType = {
  payload: { [key: string]: any };
  selectPayload: (payload: { [key: string]: any }) => void;
};

const MasterDetailContext = createContext<ContextType>({
  payload: {},
  selectPayload: () => {},
});

export function MasterDetail({ children }: MasterDetailProps) {
  const [payload, setPayload] = useState<{ [key: string]: any }>({});

  const selectPayload = (newPayload: { [key: string]: any }) => {
    setPayload(newPayload);
  };

  const renderItems = React.Children.map(
    children,
    (child: React.ReactElement<any>) => {
      if (child.type === MasterDetail.Item) {
        return React.cloneElement(child);
      }
        return null;
    }
  );

  const renderDetail = React.Children.map(
    children,
    (child: React.ReactElement<any>) => {
      if (child.type === MasterDetail.Detail) {
        return React.cloneElement(child);
      }
      return null;
    }
  );

  return (
    <MasterDetailContext.Provider value={{ payload, selectPayload }}>
      <div style={{ display: "flex", justifyContent:'space-between'  }}>
        <div>{renderItems}</div>

        <div style={{margin:'auto'}}>{renderDetail}</div>
      </div>
    </MasterDetailContext.Provider>
  );
}

MasterDetail.Item = function Item({ children, payload }: ItemProps) {
  const { selectPayload } = useContext(MasterDetailContext);

  return <div onClick={() => selectPayload(payload)}>{children}</div>;
};

MasterDetail.Detail = function Detail({ children }: DetailProps) {
  const { payload } = useContext(MasterDetailContext);

  return <div>{children(payload)}</div>;
};
