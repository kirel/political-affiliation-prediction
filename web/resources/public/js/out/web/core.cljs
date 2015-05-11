(ns web.core
    (:require [reagent.core :as reagent :refer [atom]]
              [reagent.session :as session]
              [secretary.core :as secretary :include-macros true]
              [goog.events :as events]
              [goog.history.EventType :as EventType]
              [cljsjs.react]
              [cljsjs.d3])
    (:import goog.History))

;; -------------------------
;; Components

; predicted looks like {:predicted [{:party "name" :probability 0.5}]}
(defn results [predicted]
  (let [predictions (:prediction predicted)
        parties (map :name predictions)
        svg-width 500
        svg-height 500
        y-scale (.. (js/d3.scale.linear)
                    (domain (js/Array. 0 1))
                    (range (js/Array svg-height 0)))
        x-scale (.. (js/d3.scale.ordinal)
                    (domain (apply js/Array parties))
                    (rangeRoundBands (js/Array 0 svg-width) 0.1))
        ]
    (print (y-scale 0))
    (print (apply js/Array parties))
    ;; (print (.domain x-scale))
    (print (x-scale "SPD"))
    [:svg {:width svg-width :height svg-height}
   (for [pred (:prediction predicted)]
     ^{:key (:name pred)} [:rect {:x (x-scale (:name pred))
                                  :y (y-scale (:probability pred))
                                  :width (.rangeBand x-scale)
                                  :height (- (y-scale 0) (y-scale (:probability pred)))}])
   ])
  )

(def mock-prediction
  {
   :prediction [{:name "Grüne" :probability 0.1}
                {:name "SPD" :probability 0.4}]
   })

;; -------------------------
;; Views

(defn home-page []
  [:div
   [:h2 "Welche Partei?"]
   (results mock-prediction)
   [:div [:a {:href "#/about"} "go to about page"]]])

(defn about-page []
  [:div [:h2 "About web"]
   [:div [:a {:href "#/"} "go to the home page"]]])

(defn current-page []
  [:div [(session/get :current-page)]])

;; -------------------------
;; Routes
(secretary/set-config! :prefix "#")

(secretary/defroute "/" []
  (session/put! :current-page #'home-page))

(secretary/defroute "/about" []
  (session/put! :current-page #'about-page))

;; -------------------------
;; History
;; must be called after routes have been defined
(defn hook-browser-navigation! []
  (doto (History.)
    (events/listen
     EventType/NAVIGATE
     (fn [event]
       (secretary/dispatch! (.-token event))))
    (.setEnabled true)))

;; -------------------------
;; Initialize app
(defn mount-root []
  (reagent/render [current-page] (.getElementById js/document "app")))

(defn init! []
  (hook-browser-navigation!)
  (mount-root))
