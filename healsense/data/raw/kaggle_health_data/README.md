# Comparative-Analysis-of-Cardiovascular-Disease-Prediction-Using-ML-and-Deep-Learning
### Abstract

This research investigates the potential of using physiological signs, including respiratory rate, blood pressure, body 
temperature, heart rate, and oxygen saturation, to predict cardiovascular disease (CVD) in humans. Machine learning (ML) and deep 
learning (DL) models were employed to determine the most effective prediction model by comparing their performance metrics to a 
previous study conducted by Ashfaq et al. in 2022. Ashfaq's research utilized three parameters (body temperature, heart rate, and oxygen 
saturation) and achieved a top performance of 96% using K-Nearest Neighbour (KNN). The analysis utilized a dataset obtained from the 
MIMIC-III clinical database. Four models were evaluated: Random Forest (RF), K-Nearest Neighbour (KNN) as part of the ML 
approach, and Multi-Layer Perception (MLP) and Convolutional Neural Network (CNN) as part of the DL approach. Performance 
evaluation was conducted using five measurement metrics, namely accuracy, precision, recall, F1-score, and ROC AUC. The findings 
demonstrate significant performance by all models, with MLP exhibiting the highest overall performance measures, including an
accuracy of 99%, precision of 99%, recall of 99%, F1-score of 98%, and ROC AUC of 98%. The RF model closely followed MLP in 
terms of performance. This research provides valuable insights for medical researchers, individuals, academies, analysts, and artificial 
intelligence enthusiasts, informing them about research ideas and areas for improvement, particularly in the health sector, specifically 
in the management of CVD in humans. Furthermore, the integration of these models into monitoring systems using body sensors could 
facilitate prompt emergency intervention for CVD patients. In comparison to the previous study by Ashfaq et al., this research expands 
the parameter set to include five body parameters, enhancing the accuracy and effectiveness of CVD prediction. The utilization of 
advanced ML and DL models highlights the potential for significant improvements in the field of cardiovascular disease prediction and 
management.

### Motiavtion

The motivation behind this research stems from the pressing need to improve the prediction and management of cardiovascular disease (CVD), a leading cause of mortality worldwide. Despite advancements in medical science, there remains a significant challenge in accurately predicting and detecting CVD in its early stages. This study seeks to address this challenge by leveraging machine learning (ML) and deep learning (DL) models to analyze physiological signs associated with CVD, including respiratory rate, blood pressure, body temperature, heart rate, and oxygen saturation.
By comparing the performance of various ML and DL models with a previous study conducted by Ashfaq et al., we aim to identify the most effective prediction model. The potential of achieving high accuracy rates, as demonstrated by the MLP model in our research, offers promising prospects for enhancing CVD prediction and management strategies. These findings hold implications not only for medical researchers and practitioners but also for individuals, academies, analysts, and AI enthusiasts interested in advancing healthcare technology.
Furthermore, the integration of these predictive models into monitoring systems using body sensors could revolutionize the way CVD patients are managed. Real-time monitoring facilitated by advanced ML and DL algorithms could enable prompt emergency intervention, potentially saving lives and improving patient outcomes. Overall, this research contributes to the growing body of knowledge in the field of cardiovascular disease prediction and underscores the transformative potential of AI-driven approaches in healthcare.

### About the dataset

In this project, we successfully utilized the MIMIC-III clinical database, renowned for its vast collection of deidentified clinical data from over 50,001 critically ill patients treated at Beth Israel Deaconess Medical Center between 2001 and 2012, as underscored by Johnson, Pollard, and Mark (2016). This database encompassed a comprehensive array of demographic information, vital signs, lab test results, treatments, medications, written notes, imaging reports, and post-hospital outcomes. Leveraging the accessibility of Google's Big Query cloud and Amazon's AWS cloud, we employed 'Amazon S3' to seamlessly extract the necessary data for our cardiovascular disease forecasting analysis.

### Data Processing

Data Pre-Processing: We meticulously cleaned and prepared the raw dataset, following established procedures outlined by Chaki and Ucar (2023) and Mishra et al. (2020). This involved removing duplicates, correcting anomalies, and addressing missing values to ensure dataset accuracy.
Our project efficiently utilized SQL, a standard language for relational databases, along with Amazon Web Services (AWS) Athena, a SQL-based query tool, to retrieve essential data from the MIMIC-III clinical database. Leveraging SQL queries, we accessed vital information including pulse rate, blood pressure, blood oxygen saturation, respiration rate, and body temperature. AWS Athena proved instrumental in seamlessly querying data stored on AWS, enabling swift data retrieval. Through the Athena interface, we executed SQL queries to extract the desired dataset, subsequently saving it to a CSV file for further analysis. This approach significantly streamlined the process of obtaining relevant data from the MIMIC-III database, highlighting the efficiency of SQL and AWS Athena in data retrieval for our research endeavors.

Dealing with Outliers: We carefully evaluated our dataset for outliers and retained them, as they did not significantly deviate from the mean or standard deviation, thereby maintaining the integrity of our analysis.

Data Transformation: Our team successfully transformed the dataset into a usable format with properly labeled variables, as outlined by Lachlan (2017). We opted not to scale variables to ensure accurate interpretation.

Exploratory Data Analysis (EDA): Through comprehensive EDA, we identified trends and patterns in the data, facilitating hypothesis testing and informing model development.

Model Building: Utilizing methodologies outlined by Janiesch, Zschech, & Heinrich (2021), we developed machine learning (ML) and deep learning (DL) models tailored to our research goals and dataset characteristics.

Model Selection: We carefully selected appropriate algorithms, considering factors such as data nature, complexity, and available resources, as suggested by Ghosh and Dasgupta (2022).

### Human Biophysical Parameters

The project is built upon the foundation of human biophysical parameters, serving as crucial indicators for monitoring and intervening in cardiovascular disease (CVD) patients, facilitating both long-term and near-term risk assessment. These parameters, including heart rate, respiration rate, blood pressure, and oxygen saturation, play a pivotal role in assessing overall health and predicting the risk of CVD development. Through meticulous analysis and interpretation of these vital signs, the project aims to enhance early detection, intervention, and management strategies for individuals susceptible to CVD, thereby contributing to improved patient outcomes and reduced cardiovascular morbidity and mortality rates.

### Link to the published project
https://www.ijsr.net/archive/v12i8/SR23809044938.pdf
