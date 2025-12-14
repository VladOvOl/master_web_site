import { useState } from 'react';
import styles from './Point.module.css'
import type { IPoint } from '../../feature/map/MapFeature';

type IProps = {
    items: IPoint[];
};

const Point: React.FC<IProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return <div className={styles.empty}>No data available</div>;
  }

  return (
    <div className={styles.list}>
      {items.map((item, index) => {
        if (!item) return null;

        return (
          <div key={item.id ?? index} className={styles.card}>
            {/* Header */}
            <div className={styles.header}>
              <h3 className={styles.title}>
                {item.name || "Untitled"}
              </h3>
              <span className={styles.status}>
                {item.status || "UNKNOWN"}
              </span>
            </div>

            {/* Description */}
            {item.description && (
              <p className={styles.description}>{item.description}</p>
            )}

            {/* Info */}
            <div className={styles.info}>
              <InfoRow label="Address" value={item.address} />
              <InfoRow
                label="Location type"
                value={item.locationType?.name}
              />
              <InfoRow
                label="Coordinates"
                value={
                  item.location?.latitude != null &&
                  item.location?.longitude != null
                    ? `${item.location.latitude}, ${item.location.longitude}`
                    : undefined
                }
              />
              <InfoRow
                label="Created by"
                value={
                  item.createdBy
                    ? `${item.createdBy.firstName || ""} ${
                        item.createdBy.lastName || ""
                      }`.trim()
                    : undefined
                }
              />
            </div>

            {/* Contacts */}
            {Array.isArray(item.contacts) && item.contacts.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>Contacts</div>
                <ul className={styles.listSimple}>
                  {item.contacts.map(
                    (c) =>
                      c && (
                        <li key={c.id}>
                          {c.fullName || "Unnamed"}
                          <span className={styles.muted}>
                            {" "}
                            • {c.phoneNumber || "No phone"}
                          </span>
                        </li>
                      )
                  )}
                </ul>
              </div>
            )}

            {/* Services */}
            {Array.isArray(item.services) && item.services.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>Services</div>
                <div className={styles.badges}>
                  {item.services.map(
                    (s) =>
                      s && (
                        <span key={s.id} className={styles.badge}>
                          {s.name || "—"}
                        </span>
                      )
                  )}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className={styles.footer}>
              Photos:{" "}
              {Array.isArray(item.photoIds)
                ? item.photoIds.length
                : 0}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Point;

/* 🔹 Small helper */
const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value?: string;
}) => (
  <div className={styles.row}>
    <span className={styles.label}>{label}</span>
    <span className={styles.value}>
      {value || "—"}
    </span>
  </div>
);
