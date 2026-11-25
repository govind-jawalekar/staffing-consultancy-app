import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import bynaric from "../assets/bynaric-logo.png";
import cloudywave from "../assets/cloudy-wave-logo.webp";
import coreflex from "../assets/coreflex-logo.svg";
import evonix from "../assets/evonix-logo.webp";
import invorbovict from "../assets/invorbovict-logo.png";
import NuageCX from "../assets/NuageCX-logo.svg";
import senwell from "../assets/senwell-logo.png";
import skyroot from "../assets/skyroot-logo.webp";
import sourceio from "../assets/sourceio-logo.png";
import sumasoft from "../assets/sumasoft-logo.png";
import vritti from "../assets/vritti-logo.png";
import Walstar from "../assets/Walstar-logo.png";
import Automatic from "../assets/Automatic.png";
import Elansol from "../assets/Elansol.png";
import gbis from "../assets/GBIS.png";
import intellisource from "../assets/intellisource-logo.png";
import Nimap from "../assets/Nimap-Infotech-logo.svg";
import Quickensol from "../assets/Quickensol.png";
import infosys from "../assets/infosys.svg";
import cognizant from "../assets/cognizant.svg";
import tcs from "../assets/TCS.webp";
import zensar from "../assets/zensar.jpg";
import talentica from "../assets/Talentica-logo.svg";
import persistent from "../assets/Persistent.svg";
import elite from "../assets/elite.jpg";
import druva from "../assets/druva-logo.svg";
import leometric from "../assets/leometric.png";

export  const clients = [
      { logo: tcs,          name: "TCS",             desc: "A global IT services , and business solutions  and digital transformation services worldwide. It helps businesses worldwide improve efficiency through technology, analytics, and enterprise services." },
      { logo: bynaric,     name: "Bynaric",          desc: "Company that provides software development, recruitment, and technology services to businesses. It focuses on delivering customized technology services to help businesses improve their digital presence and operations." },
      { logo: cloudywave,  name: "Cloudy wave",      desc: "Company that provides cloud computing, software development, and digital technology solutions. It focuses on helping businesses adopt cloud technologies and build scalable digital solutions for growth." },
      { logo: coreflex,    name: "Coreflex",         desc: "software development, cloud services, and technology consulting &  help to improve digital operations." },
      { logo: evonix,      name: "Evonix",           desc: "Company that provides software development, digital transformation, and consulting solutions for businesses." },
      { logo: invorbovict, name: "Invorbovict",      desc: "Company that provides software development, digital services, and business technology consulting." },
      { logo: NuageCX,     name: "NuageCX",          desc: "Company that provides cloud-based contact center, CRM, and digital support services for businesses." },
      { logo: senwell,     name: "Senwell",          desc: "Company that provides software development, digital solutions, and technology consulting for businesses." },
      { logo: skyroot,     name: "Skyroot",          desc: "It helps businesses grow through branding, creative content and data-driven marketing strategies." },
      { logo: cognizant,    name: "Cognizant",       desc: "A global IT services and consulting company that provides digital transformation,  outsourcing solutions to clients worldwide. It helps organizations improve efficiency and innovation through software development, data analytics, and IT consulting services." },
      { logo: vritti,      name: "Vritti",           desc: "Company that provides ERP/CRM software, IT solutions, and media marketing services to businesses , It focuses on delivering business automation and workforce management solutions to improve organizational efficiency." },
      { logo: Walstar,     name: "Walstar",          desc: " web development, mobile app development, and digital marketing services , It focuses on helping businesses grow through technology-driven services and innovative digital strategies." },
      { logo: sourceio,    name: "Sourceio",         desc: "Company that provides software development, technology consulting ." },
      { logo: sumasoft,    name: "SumaSoft",         desc: "software development, cybersecurity, and technical support services to global clients" },
      { logo: Automatic,   name: "Automatic",        desc: "Specializing in SAP implementation, SAP consulting, and software solutions for businesses." },
      { logo: infosys,      name: "Infosys",         desc: "Provides software development, digital transformation, cloud, and business consulting services worldwide." },
      
      { logo: Elansol,     name: "Elansol",          desc: "It providing IT consulting, digital transformation, smart factory and industrial automation solutions ." },
      { logo: gbis,        name: "GBIS",             desc: "It provides software development, SAP/Salesforce consulting, data analytics,  digital transformation solutions." },
      { logo: intellisource,name: "IntelliSource",   desc: "Application development and software solutions in the information technology sector, It provides solutions like recruitment, outsourcing, and project-based support across various industries." },
      { logo: Quickensol,   name: "Quickensol",      desc: "software development, and digital marketing services to help businesses grow digitally, It focuses on delivering customized technology solutions to help startups and enterprises improve their online presence and operations." },
      { logo: Nimap,        name: "Nimap",           desc: "That provides web, mobile, and custom software solutions along with IT outsourcing for global businesses, It focuses on delivering scalable technology solutions and helping businesses with digital transformation and project support." },
      
      { logo: zensar,       name: "Zensar",          desc: "That provides cloud, AI, and application management services to businesses worldwide." },
      { logo: talentica,    name: "Talentica",       desc: "That helps startups build scalable products using technologies like cloud, AI, and data engineering." },
      { logo: persistent,   name: "Persistent",      desc: "That provides software development, cloud, AI, and data solutions for businesses worldwide." },
      { logo: elite,        name: "Elite",           desc: "Business networking and training organization that focuses on entrepreneurship, leadership development, and connecting professionals." },
      { logo: druva,        name: "Druva",           desc: "That  provides data backup, security, and disaster recovery solutions for enterprises." },
      { logo: leometric,    name: "Leometric",       desc: "That provides software development, digital solutions, and technology consulting services." },
      
      
    ];


