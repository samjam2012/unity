import React, { useEffect, useState } from "react";
import { Page } from "../../../../interfaces/app/pages";
import { healthCheck } from "../../../../api/events";
import HashLoader from "react-spinners/HashLoader";
import styles from "./styles.scss";
import { H, Container } from "../../../components";
import { camelCase, startCase } from "lodash";

interface Report {
  collections: number;
  database: string;
  indexes: number;
  objects: number;
  ok: boolean;
  usage: {
    proportion: string;
    used: string;
    total: string;
  };
}

export default function Report(props: Page) {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const getReport = async () => {
      const stats = await healthCheck();
      setReport(stats);
    };
    getReport();
  }, []);

  const getDisplayKey = (key: string) => {
    return startCase(camelCase(key)).replace(/ /g, "");
  };

  const HealthReport = () => {
    if (!report) {
      return <div />;
    }
    const { collections, database, indexes, objects, ok, metrics = {} } =
      report || ({} as any);

    const { connections, opcounters, usage } = metrics;

    return (
      <Container>
        <H className={styles.header} size={2} text={"DB Daily Health Report"} />
        <div>
          <div className={styles.content}>
            <div className={styles.column}>
              <div>Database</div>
              <div>{database}</div>
              <div>Status</div>
              <div>{ok ? "Online" : "Offline"}</div>
            </div>
            <div className={styles.column}>
              <div>Connections</div>
              <div className={styles.outerObj}>
                {Object.entries(connections).map(([key, value]) => {
                  const displayKey = getDisplayKey(key);
                  if (typeof value === "object" && value !== null) {
                    return (
                      <div key={key} className={styles.innerObj}>
                        <p>{displayKey}</p>
                        {Object.entries(value).map(([key, value]) => {
                          return <p key={key}>{`${key}: ${value}`}</p>;
                        })}
                      </div>
                    );
                  }
                  return <p key={key}>{`${displayKey}: ${value}`}</p>;
                })}
              </div>
            </div>
            <div className={styles.column}>
              <div>Operations</div>
              <div>
                {Object.entries(opcounters).map(arr => {
                  return (
                    <p key={arr[0]}>{`${getDisplayKey(arr[0])}: ${arr[1]}`}</p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.column}>
              <div>Size</div>
              <div>
                <p>{`Collections: ${Object.keys(collections).length}`}</p>
                <p>{`Objects: ${objects}`}</p>
                <p>{`Indexes: ${indexes}`}</p>
              </div>
            </div>
            <div className={styles.column}>
              <div>Usage</div>
              <div>
                {Object.entries(usage).map(arr => {
                  return (
                    <p key={arr[0]}>{`${getDisplayKey(arr[0])}: ${arr[1]}`}</p>
                  );
                })}
              </div>
            </div>
            <div className={styles.largeColumn}>
              <div>Collections</div>
              <div className={styles.outerObj}>
                {Object.entries(collections).map(([key, value]) => {
                  const displayKey = getDisplayKey(key);
                  if (typeof value === "object" && value !== null) {
                    return (
                      <div key={key} className={styles.innerObj}>
                        <p>{displayKey}</p>
                        {Object.entries(value).map(([key, value]) => {
                          return <p key={key}>{`${key}: ${value}`}</p>;
                        })}
                      </div>
                    );
                  }
                  return <p key={key}>{`${displayKey}: ${value}`}</p>;
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  };
  const Loader = () => {
    return (
      <div className={styles.loader}>{<HashLoader loading={!report} />}</div>
    );
  };

  return (
    <Container>
      <Loader />
      <HealthReport />
    </Container>
  );
}
