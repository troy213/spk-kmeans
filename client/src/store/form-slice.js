import { createSlice } from '@reduxjs/toolkit'

const formSlice = createSlice({
  name: 'form',
  initialState: {
    keteranganCalon: {
      hari: '',
      waktuDanTempat: '',
      namaCalon: '',
      nik: '',
      kecamatan: '',
      kelurahan: '',
      nomorHpCalon: '',
    },
    pertanyaanPetugas: {
      bersediaBelajar: '',
      bersediaTTD: '',
      bersediaAturan: '',
      bersediaTugas: '',
      kesibukan: '',
      hasMotor: '',
      bisaBerkendara: '',
      hasAndroid: '',
    },
    penilaian: {
      nilaiCalon: '',
      kelengkapanDokumen: '',
      kepribadian: '',
    },
    pengetahuan: {
      strategiPerumElite: '',
      strategiApartemen: '',
      strategiResponden: '',
    },
    kesimpulan: {
      catatan: '',
    },
    error: {
      keteranganCalonErr: {
        hariErr: false,
        waktuDanTempatErr: false,
        namaCalonErr: false,
        nikErr: false,
        kecamatanErr: false,
        kelurahanErr: false,
        nomorHpCalonErr: false,
      },
      pertanyaanPetugasErr: {
        bersediaBelajarErr: false,
        bersediaTTDErr: false,
        bersediaAturanErr: false,
        bersediaTugasErr: false,
        kesibukanErr: false,
        hasMotorErr: false,
        bisaBerkendaraErr: false,
        hasAndroidErr: false,
      },
      penilaianErr: {
        nilaiCalonErr: false,
        kelengkapanDokumenErr: false,
        kepribadianErr: false,
      },
      pengetahuanErr: {
        strategiPerumEliteErr: false,
        strategiApartemenErr: false,
        strategiRespondenErr: false,
      },
    },
    modalValue: '',
  },
  reducers: {
    setKeteranganCalon(state, action) {
      state.keteranganCalon[action.payload.input] = action.payload.value
    },
    setPertanyaanPetugas(state, action) {
      state.pertanyaanPetugas[action.payload.input] = action.payload.value
    },
    setPenilaian(state, action) {
      state.penilaian[action.payload.input] = action.payload.value
    },
    setPengetahuan(state, action) {
      state.pengetahuan[action.payload.input] = action.payload.value
    },
    setKesimpulan(state, action) {
      state.kesimpulan[action.payload.input] = action.payload.value
    },
    setError(state, action) {
      state.error[action.payload.state][action.payload.input] =
        action.payload.value
    },
    setModalValue(state, action) {
      state.modalValue = action.payload
    },
    clearForm(state) {
      for (const stateObj in state) {
        const EXCEPTION = ['error']
        if (EXCEPTION.includes(stateObj)) continue

        for (const childStateObj in state[stateObj]) {
          state[stateObj][childStateObj] = ''
        }
      }
    },
  },
})

export const formActions = formSlice.actions

export default formSlice
