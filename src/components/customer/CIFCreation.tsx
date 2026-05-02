import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Building2, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  Users, 
  Contact, 
  MapPin, 
  Phone,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useBanking } from '@/src/context/BankingContext';

interface CIFCreationProps {
  initialType?: 'RETAIL' | 'CORPORATE';
}

export default function CIFCreation({ initialType = 'RETAIL' }: CIFCreationProps) {
  const { createCustomer } = useBanking();
  const [cifType, setCifType] = useState<'RETAIL' | 'CORPORATE'>(initialType);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [createdCifId, setCreatedCifId] = useState('');

  const [formData, setFormData] = useState({
    // Retail Fields
    title: 'Mr',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'Male',
    dob: '',
    nationality: 'Indian',
    idType: 'PASSPORT',
    idNumber: '',
    
    // Contact
    mobile: '',
    email: '',
    address: '',
    city: '',
    
    // Corporate Fields
    entityName: '',
    registrationNo: '',
    constitutionType: 'Private Limited',
    industry: 'Software/Technology',
    dateOfInc: '',
  });

  const totalSteps = cifType === 'RETAIL' ? 4 : 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      submitForm();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const submitForm = () => {
    setIsSubmitting(true);
    try {
      const customer = createCustomer({
        type: cifType,
        title: formData.title,
        firstName: formData.firstName.toUpperCase() || undefined,
        middleName: formData.middleName.toUpperCase() || undefined,
        lastName: formData.lastName.toUpperCase() || undefined,
        gender: formData.gender,
        dob: formData.dob,
        nationality: formData.nationality,
        idType: formData.idType,
        idNumber: formData.idNumber,
        entityName: formData.entityName.toUpperCase() || undefined,
        registrationNo: formData.registrationNo,
        constitutionType: formData.constitutionType,
        industry: formData.industry,
        dateOfInc: formData.dateOfInc,
        mobile: formData.mobile,
        email: formData.email,
        address: formData.address,
        city: formData.city,
      });
      setCreatedCifId(customer.cifId);
      setIsSubmitting(false);
      setIsComplete(true);
    } catch {
      setIsSubmitting(false);
    }
  };

  const renderProgress = () => (
    <div className="flex items-center justify-between mb-12 px-4 max-w-3xl mx-auto">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-2 relative">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
              step > i + 1 ? 'bg-emerald-500 border-emerald-500 text-white' :
              step === i + 1 ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-xl shadow-blue-600/20' :
              'border-slate-200 bg-white text-slate-300'
            }`}>
              {step > i + 1 ? <CheckCircle2 size={20} /> : <span className="text-xs font-black">{i + 1}</span>}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-widest absolute -bottom-6 whitespace-nowrap ${
              step === i + 1 ? 'text-blue-600' : 'text-slate-400'
            }`}>
              {cifType === 'RETAIL' ? 
                ['PROFILE', 'IDENTITY', 'CONTACT', 'VERIFY'][i] : 
                ['ENTITY', 'LEGAL', 'VERIFY'][i]}
            </span>
          </div>
          {i < totalSteps - 1 && (
            <div className={`flex-1 h-0.5 mx-4 transition-all duration-1000 ${
              step > i + 1 ? 'bg-emerald-500' : 'bg-slate-100'
            }`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderRetailStep1 = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-4">
        <label className="block">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 bg-slate-50 rounded inline-block">Full Legal Title</span>
          <select value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
            <option value="Mr">Mr.</option>
            <option value="Ms">Ms.</option>
            <option value="Dr">Dr.</option>
            <option value="Prof">Prof.</option>
          </select>
        </label>
        <label className="block">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 bg-slate-50 rounded inline-block">First Name *</span>
          <input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} placeholder="Enter first name" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </label>
        <label className="block">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 bg-slate-50 rounded inline-block">Middle Name</span>
          <input type="text" value={formData.middleName} onChange={(e) => setFormData({...formData, middleName: e.target.value})} placeholder="Middle name (optional)" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </label>
      </div>
      <div className="space-y-4">
        <label className="block">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 bg-slate-50 rounded inline-block">Last Name *</span>
          <input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} placeholder="Enter last name" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </label>
        <label className="block">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 bg-slate-50 rounded inline-block">Date of Birth *</span>
          <input type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </label>
        <label className="block">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 bg-slate-50 rounded inline-block">Gender</span>
          <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
      </div>
    </div>
  );

  const renderRetailStep2 = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-4">
        <label className="block">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 bg-slate-100 rounded inline-block">Primary Document Type</span>
          <select value={formData.idType} onChange={(e) => setFormData({...formData, idType: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
            <option value="PASSPORT">PASSPORT</option>
            <option value="GOVT ISSUED ID">GOVT ISSUED ID (ADHAAR)</option>
            <option value="PAN CARD">PAN CARD</option>
            <option value="VOTER ID">VOTER ID</option>
          </select>
        </label>
        <label className="block">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 bg-slate-100 rounded inline-block">Nationality</span>
          <input type="text" value={formData.nationality} onChange={(e) => setFormData({...formData, nationality: e.target.value})} placeholder="e.g. Indian" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </label>
      </div>
      <div className="space-y-4">
        <label className="block">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 bg-slate-100 rounded inline-block">Document Number *</span>
          <input type="text" value={formData.idNumber} onChange={(e) => setFormData({...formData, idNumber: e.target.value})} placeholder="ID Number / Reference" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold font-mono text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </label>
      </div>
      <div className="md:col-span-2 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-4">
        <ShieldCheck className="text-blue-500" />
        <span className="text-xs text-blue-700 font-bold">Automatic AML screening will be triggered upon submission of this identification artifact.</span>
      </div>
    </div>
  );

  const renderCorporateStep1 = () => (
    <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-4">
        <label className="block">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 bg-slate-100 rounded inline-block">Entity Name (Full Legal) *</span>
          <input type="text" value={formData.entityName} onChange={(e) => setFormData({...formData, entityName: e.target.value})} placeholder="Registered Name of the Company" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </label>
        <label className="block">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 bg-slate-100 rounded inline-block">Registration Number</span>
          <input type="text" value={formData.registrationNo} onChange={(e) => setFormData({...formData, registrationNo: e.target.value})} placeholder="e.g. REG-0012345" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold font-mono text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 bg-slate-100 rounded inline-block">Constitution Type</span>
            <select value={formData.constitutionType} onChange={(e) => setFormData({...formData, constitutionType: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
              <option>Private Limited</option>
              <option>Public Limited</option>
              <option>Partnership</option>
              <option>Sole Proprietorship</option>
              <option>Trust / NGO</option>
            </select>
          </label>
          <label className="block">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 bg-slate-100 rounded inline-block">Date of Incorporation</span>
            <input type="date" value={formData.dateOfInc} onChange={(e) => setFormData({...formData, dateOfInc: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </label>
        </div>
      </div>
    </div>
  );

  if (isComplete) {
    return (
      <div className="h-full bg-white flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-emerald-500/10">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter mb-4">CIF Record Orchestrated</h2>
        <p className="text-sm text-slate-500 max-w-md mb-8 leading-relaxed italic">
          New {cifType === 'RETAIL' ? 'Retail' : 'Corporate'} CIF has been successfully indexed in the core banking ledger. Verification pending by SOL manager.
        </p>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8 w-full max-w-sm">
           <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">New CIF Identity</span>
              <span className="text-lg font-black text-blue-600 font-mono">{createdCifId}</span>
           </div>
           <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Assigned RM</span>
              <span className="text-xs font-black text-slate-700">SYS_BOT_ONBOARD</span>
           </div>
        </div>
        <button 
           onClick={() => { setStep(1); setIsComplete(false); }}
           className="px-8 py-3 bg-[#003366] text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:bg-[#002244] shadow-2xl transition-all"
        >
          Create Another Identity
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Dynamic Context Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 flex justify-between items-center shadow-[0_1px_5px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            cifType === 'RETAIL' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
          }`}>
            {cifType === 'RETAIL' ? <User size={24} /> : <Building2 size={24} />}
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">
              {cifType === 'RETAIL' ? 'New Entity > CIF Retail (SQDE)' : 'New Entity > Corporate CIF'}
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <ShieldCheck size={12} className="text-emerald-500" />
               Enterprise Customer Onboarding Engine v4.2
            </p>
          </div>
        </div>

        <div className="flex gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button 
            onClick={() => { setCifType('RETAIL'); setStep(1); }}
            className={`px-4 py-2 text-[10px] font-black uppercase tracking-tight rounded-lg transition-all ${
              cifType === 'RETAIL' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            S.Q.D.E Retail
          </button>
          <button 
            onClick={() => { setCifType('CORPORATE'); setStep(1); }}
            className={`px-4 py-2 text-[10px] font-black uppercase tracking-tight rounded-lg transition-all ${
              cifType === 'CORPORATE' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Corporate CIF
          </button>
        </div>
      </div>

      <div className="p-8 lg:p-12 max-w-5xl mx-auto">
        {renderProgress()}

        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl shadow-slate-200/50 p-8 lg:p-12 mt-12 relative overflow-hidden">
           {/* Decorative Elements */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 blur-[100px] -mr-32 -mt-32"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50/50 blur-[100px] -ml-32 -mb-32"></div>

           <div className="relative z-10">
              <div className="mb-8 flex items-center gap-4">
                 <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                    {step === 1 ? <FileText size={20} /> : step === 2 ? <Contact size={20} /> : <MapPin size={20} />}
                 </div>
                 <div>
                    <h3 className="text-lg font-black text-slate-800 uppercase italic tracking-tighter">
                       {cifType === 'RETAIL' ? (
                         step === 1 ? 'Primary Profile Details' : 
                         step === 2 ? 'Identity & Compliance' : 
                         step === 3 ? 'Contact & Communication' : 'Final Review'
                       ) : (
                         step === 1 ? 'Entity Registration' : 
                         step === 2 ? 'Legal Constitution' : 'Final Review'
                       )}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step {step} of {totalSteps} — Data Integrity Enforcement</p>
                 </div>
              </div>

              {/* Form Rendering */}
              {cifType === 'RETAIL' ? (
                <>
                  {step === 1 && renderRetailStep1()}
                  {step === 2 && renderRetailStep2()}
                  {step === 3 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="space-y-4">
                        <label className="block">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 bg-slate-100 rounded inline-block">Mobile Number *</span>
                          <input type="text" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} placeholder="+91 99000 00000" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold font-mono text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                        </label>
                        <label className="block">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 bg-slate-100 rounded inline-block">City</span>
                          <input type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} placeholder="City of residence" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                        </label>
                      </div>
                      <div className="space-y-4">
                        <label className="block">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 bg-slate-100 rounded inline-block">Email Address</span>
                          <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="customer@domain.com" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                        </label>
                        <label className="block">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 bg-slate-100 rounded inline-block">Address</span>
                          <textarea value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Full residential address" rows={2} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" />
                        </label>
                      </div>
                    </div>
                  )}
                  {step === 4 && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                         <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Summary Verification</h4>
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {[
                               { l: 'Full Name', v: [formData.firstName, formData.middleName, formData.lastName].filter(Boolean).join(' ').toUpperCase() || '—' },
                               { l: 'Identity', v: formData.idNumber || '—' },
                               { l: 'Mobile', v: formData.mobile || '—' },
                               { l: 'Nationality', v: formData.nationality || '—' },
                               { l: 'KYC Status', v: 'PENDING' },
                            ].map((item, i) => (
                              <div key={i}>
                                 <span className="text-[9px] font-bold text-slate-400 block uppercase leading-none mb-1">{item.l}</span>
                                 <span className="text-xs font-black text-slate-800 italic uppercase">{item.v}</span>
                              </div>
                            ))}
                         </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 rounded-xl border border-amber-100 bg-amber-50">
                        <AlertCircle className="text-amber-500 shrink-0" size={20} />
                        <p className="text-[10px] text-amber-800 font-bold leading-relaxed italic">
                          By finalizing this record, you affirm that physical verification of original documents according to the Unified KYC Policy has been conducted and verified.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {step === 1 && renderCorporateStep1()}
                  {step === 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
                       <label className="block col-span-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 bg-slate-100 rounded inline-block">Registered Tax ID (PAN/VAT) *</span>
                          <input type="text" value={formData.registrationNo} onChange={(e) => setFormData({...formData, registrationNo: e.target.value})} placeholder="e.g. IT-VAT-1234567" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold font-mono text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                        </label>
                        <label className="block col-span-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 bg-slate-100 rounded inline-block">Mobile / Contact Number</span>
                          <input type="text" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} placeholder="+1 (555) 000-0000" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold font-mono text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                        </label>
                        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 col-span-2">
                           <p className="text-[10px] text-emerald-800 font-bold italic">
                             Corporate onboarding requires secondary verification of Beneficial Ownership (UBO) structures. Ensure Annexure C-4 is uploaded to the document vault.
                           </p>
                        </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                       <ShieldCheck size={40} className="text-blue-600 mx-auto mb-4" />
                       <h4 className="text-sm font-black text-slate-800 uppercase italic mb-2">Corporate Entity Ready for Indexing</h4>
                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">All mandatory legal fields have passed basic structural validation.</p>
                    </div>
                  )}
                </>
              )}

              {/* Navigation Actions */}
              <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                 <button 
                   onClick={handleBack}
                   disabled={step === 1}
                   className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                     step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                   }`}
                 >
                   <ChevronLeft size={16} /> Back
                 </button>
                 
                 <button 
                   onClick={handleNext}
                   disabled={isSubmitting}
                   className={`flex items-center gap-3 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl ${
                     isSubmitting ? 'bg-slate-100 text-slate-400' : 
                     step === totalSteps ? 'bg-emerald-600 text-white shadow-emerald-600/20 hover:scale-105 active:scale-95' :
                     'bg-blue-600 text-white shadow-blue-600/20 hover:translate-x-1 active:scale-95'
                   }`}
                 >
                   {isSubmitting ? 'Processing Audit...' : (
                      <>
                        {step === totalSteps ? 'Seal Identity' : 'Proceed to next'}
                        {step !== totalSteps && <ArrowRight size={16} />}
                      </>
                   )}
                 </button>
              </div>
           </div>
        </div>

        <div className="mt-12 flex justify-center gap-8 opacity-40">
           <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase italic">
              <Users size={14} /> Unified CRM Engine
           </div>
           <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase italic">
              <Contact size={14} /> KYC Compliant
           </div>
           <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase italic">
              <ShieldCheck size={14} /> SOC2 SECURE
           </div>
        </div>
      </div>
    </div>
  );
}
