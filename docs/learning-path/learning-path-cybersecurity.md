---
id: learning-path-cybersecurity
title: Learning Path Cybersecurity
tags:
  - learning-path
  - security
  - open-source
og:
  kicker: Roadmap
  title: Cybersecurity, self-hosted
  description: Blue, red and purple team, using only open source tools you run yourself.
  lanes:
    - label: Blue team
      color: blue
      items: [Wazuh, Suricata + Zeek, Velociraptor, DFIR-IRIS]
    - label: Red team
      color: red
      items: [Nmap + Nuclei, BloodHound CE, Sliver, Gophish]
    - label: Purple team
      color: purple
      items: [OpenCTI + MISP, Caldera, Atomic Red Team, VECTR]
---

A route through security where every tool is open source and runs on your own machines.
No SaaS, no trial licenses, no data leaving your network.

Learn it in this order: build a lab, defend it, attack it, then make both sides work together.
Each tool below is the one I would pick first; once you know it, the alternatives are easy.

Only attack systems you own or have written permission to test.

## 0. Foundations

- [ ] learn Linux well: processes, permissions, systemd, logs in `/var/log` and `journalctl`
- [ ] learn networking: TCP/IP, DNS, HTTP, TLS, and read packets with [Wireshark](https://www.wireshark.org/)
- [ ] learn the attacker playbook as a map: [MITRE ATT&CK](https://attack.mitre.org/) tactics and techniques
  - [ ] learn the [Cyber Kill Chain](https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html) and the [Pyramid of Pain](https://detect-respond.blogspot.com/2013/03/the-pyramid-of-pain.html)
- [ ] learn the [OWASP Top 10](https://owasp.org/www-project-top-ten/) for web applications

## 1. Build the lab

Everything else runs here. Break it, snapshot it, rebuild it.

- [ ] run a hypervisor with [Proxmox VE](https://www.proxmox.com/en/proxmox-virtual-environment/overview)
- [ ] put a firewall in front of the lab with [OPNsense](https://opnsense.org/)
- [ ] add an Active Directory to attack and defend with [GOAD, Game of Active Directory](https://github.com/Orange-Cyberdefense/GOAD)
- [ ] add vulnerable targets: [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/), [DVWA](https://github.com/digininja/DVWA) and [Metasploitable](https://github.com/rapid7/metasploitable3)
- [ ] keep an attacker box with [Kali Linux](https://www.kali.org/)
- [ ] host your own challenges for the team with [CTFd](https://github.com/CTFd/CTFd)

## 2. Blue team: see everything

You cannot defend what you cannot see. Collect first, detect second.

- [ ] deploy [Wazuh](https://wazuh.com/) as SIEM and XDR: agents on every host, file integrity, vulnerability detection, compliance
  - [ ] write your own Wazuh rules and decoders
  - [ ] add [Sysmon for Linux](https://github.com/microsoft/SysmonForLinux) for richer process telemetry
- [ ] centralize logs with [Graylog](https://graylog.org/) or [OpenSearch](https://opensearch.org/), shipped by [Fluent Bit](https://fluentbit.io/)
- [ ] watch the network with [Suricata](https://suricata.io/) for IDS and [Zeek](https://zeek.org/) for network metadata
  - [ ] keep full packet capture with [Arkime](https://arkime.com/)
  - [ ] or get Suricata, Zeek, Arkime and a SIEM in one install with [Security Onion](https://securityonionsolutions.com/)
- [ ] query every endpoint like a database with [osquery](https://osquery.io/) managed by [Fleet](https://fleetdm.com/)
- [ ] block brute force and bad IPs with [CrowdSec](https://www.crowdsec.net/) or [Fail2ban](https://github.com/fail2ban/fail2ban)

## 3. Blue team: detect and respond

- [ ] write detections once, run them anywhere with [Sigma](https://github.com/SigmaHQ/sigma) and [pySigma](https://github.com/SigmaHQ/pySigma)
  - [ ] write file and memory signatures with [YARA](https://github.com/VirusTotal/yara)
- [ ] automate triage with [Shuffle](https://shuffler.io/) as SOAR: Wazuh alert in, enrichment, ticket out
- [ ] manage incidents and cases with [DFIR-IRIS](https://dfir-iris.org/)
  - [ ] enrich observables with [Cortex](https://github.com/TheHive-Project/Cortex) analyzers
- [ ] hunt and collect forensic artifacts from any host with [Velociraptor](https://docs.velociraptor.app/)
- [ ] analyze memory with [Volatility 3](https://github.com/volatilityfoundation/volatility3) and disks with [Autopsy](https://www.autopsy.com/)
- [ ] build timelines with [Plaso](https://github.com/log2timeline/plaso) and [Timesketch](https://timesketch.org/)
- [ ] catch intruders early with honeypots: [OpenCanary](https://github.com/thinkst/opencanary) and [T-Pot](https://github.com/telekom-security/tpotce)

## 4. Blue team: reduce the attack surface

- [ ] scan the network for vulnerabilities with [OpenVAS, Greenbone Community Edition](https://greenbone.github.io/docs/latest/)
- [ ] scan containers, IaC and dependencies with [Trivy](https://trivy.dev/)
- [ ] track every finding to closed in [DefectDojo](https://www.defectdojo.org/)
- [ ] own identity: SSO and MFA with [Keycloak](https://www.keycloak.org/) or [authentik](https://goauthentik.io/)
- [ ] keep secrets out of code with [OpenBao](https://openbao.org/) and find leaked ones with [Gitleaks](https://github.com/gitleaks/gitleaks)
- [ ] reach internal services without exposing them with [Headscale](https://github.com/juanfont/headscale) or [WireGuard](https://www.wireguard.com/)

## 5. Threat intelligence

Know who attacks companies like yours, and how, before they reach you.

- [ ] share and consume indicators with [MISP](https://www.misp-project.org/)
  - [ ] subscribe to free feeds: CIRCL OSINT, abuse.ch, AlienVault OTX
- [ ] model actors, campaigns and TTPs as a knowledge graph with [OpenCTI](https://filigran.io/solutions/open-cti/)
  - [ ] connect MISP, ATT&CK and your feeds as OpenCTI connectors
  - [ ] push OpenCTI indicators into Wazuh, so intel becomes alerts
- [ ] run your own OSINT on your company with [SpiderFoot](https://github.com/smicallef/spiderfoot)

## 6. Red team: recon and initial access

Think like the attacker, inside the lab or a signed scope.

- [ ] map hosts and ports with [Nmap](https://nmap.org/) and [Masscan](https://github.com/robertdavidgraham/masscan)
- [ ] find subdomains and live services with [Amass](https://github.com/owasp-amass/amass), [subfinder](https://github.com/projectdiscovery/subfinder) and [httpx](https://github.com/projectdiscovery/httpx)
- [ ] scan for known issues at scale with [Nuclei](https://github.com/projectdiscovery/nuclei) templates
- [ ] test web apps with [ZAP](https://www.zaproxy.org/), [ffuf](https://github.com/ffuf/ffuf) and [sqlmap](https://sqlmap.org/)
- [ ] run authorized phishing simulations with [Gophish](https://getgophish.com/)

## 7. Red team: exploit, move, persist

- [ ] exploit known vulnerabilities with [Metasploit Framework](https://github.com/rapid7/metasploit-framework)
- [ ] run command and control with [Sliver](https://github.com/BishopFox/sliver) or [Mythic](https://github.com/its-a-feature/Mythic)
- [ ] attack Active Directory paths with [BloodHound CE](https://github.com/SpecterOps/BloodHound)
  - [ ] move laterally with [NetExec](https://github.com/Pennyw0rth/NetExec) and [Impacket](https://github.com/fortra/impacket)
  - [ ] abuse certificate services with [Certipy](https://github.com/ly4k/Certipy)
- [ ] crack the hashes you collect with [Hashcat](https://hashcat.net/hashcat/) and [John the Ripper](https://github.com/openwall/john)
- [ ] write the report the client will read with [SysReptor](https://github.com/Syslifters/sysreptor) or [Ghostwriter](https://github.com/GhostManager/Ghostwriter)

## 8. Purple team: close the loop

Red finds the gap, blue closes it, and you measure both.

- [ ] pick the techniques to test from your threat intel in OpenCTI, not from what is fun
- [ ] run single techniques with [Atomic Red Team](https://github.com/redcanaryco/atomic-red-team) and [Invoke-AtomicRedTeam](https://github.com/redcanaryco/invoke-atomicredteam)
- [ ] emulate a full adversary with [MITRE Caldera](https://caldera.mitre.org/)
  - [ ] emulate cloud attacks with [Stratus Red Team](https://github.com/DataDog/stratus-red-team)
- [ ] for each technique, check Wazuh: alerted, logged only, or missed
  - [ ] turn every miss into a Sigma rule or Wazuh rule, then run the test again
- [ ] track every exercise and its outcome with [VECTR](https://github.com/SecurityRiskAdvisors/VECTR)
- [ ] map your detection coverage on [ATT&CK Navigator](https://github.com/mitre-attack/attack-navigator) with [DeTT&CT](https://github.com/rabobank-cdc/DeTTECT)

## 9. Capstone: a SOC in a box

- [ ] one compose file or Proxmox template with Wazuh, Suricata, Zeek, Shuffle, DFIR-IRIS, MISP and OpenCTI wired together
- [ ] an attack from Caldera that flows into an alert, a Shuffle playbook, an IRIS case and an ATT&CK coverage update
- [ ] write what you learned, and share it

## How the pieces connect

```
 MISP feeds ──► OpenCTI ──► indicators ──┐
                                         ▼
 agents, Suricata, Zeek, osquery ──► Wazuh ──► Shuffle ──► DFIR-IRIS case
                                         ▲                    │
 Caldera, Atomic Red Team ── attacks ────┘     Velociraptor ◄─┘ hunt
            │
            └──► VECTR + ATT&CK Navigator: what we caught, what we missed
```
