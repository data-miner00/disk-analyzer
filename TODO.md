# Disk Analyzer App - TODO

## Core Features

- [x] List disk volumes and total space
- [x] Collect and store daily disk usage snapshots
- [x] Visualize disk usage trends over time (charts/graphs)
- [x] Show usage by file type (e.g., images, videos, documents)
- [ ] Identify and list largest files/folders
- [ ] Find duplicate files
- [x] Background process
- [x] Search bar

## Reporting & Export

- [ ] Export reports (CSV, PDF, images)
- [x] Generate historical usage reports

## User Experience

- [x] Alerts/notifications for low disk space
- [ ] Scheduled scans (daily, weekly, etc.)
- [x] Dark/Light theme support
- [x] Multi-language support

---

## In Progress

- [ ] Refactor disk info collection for extensibility
- [ ] Design data storage format for daily snapshots

---

## Ideas / Backlog

- [ ] User-configurable scan locations
- [ ] File/folder exclusion rules
- [x] Integration with OS notifications
- [x] Remove randomization of name. Prompt user to name the disk if it is unnamed.
- [ ] Add vitest

---

## Fine tune

- [ ] Fonts
- [ ] New color palette

## Settings

Presentation

- [ ] Dark Mode - on or off
- [ ] Search bar - on or off - defaults to on
- [ ] Language - dropdown selection
- [ ] Prefetch count - input number - defaults to 20
- [ ] Byte Presentation - dropdown selection - B, KB, MB, GB, TB

Service

- [ ] Notification desktop - on or off
- [ ] On close minimize - on or off - defaults to on
- [ ] Start on logon - on or off - defaults to on

Data persistence

- [ ] Logging path
- [ ] Backup data
- [ ] Backup path
- [ ] Backup frequency
